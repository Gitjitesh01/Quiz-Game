import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { SketchPicker } from "react-color";
import "./style.css";
import {
  BiImageAlt,
  BiMicrophone,
  BiVideo,
  BiCopy,
  BiFileBlank,
  BiLogoGmail,
  BiImageAdd,
} from "react-icons/bi";
import {
  RiCloseCircleFill,
  RiCloseCircleLine,
  RiYoutubeLine,
} from "react-icons/ri";
import {
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  REDO_COMMAND,
  UNDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  FORMAT_TEXT_COMMAND,
  FORMAT_ELEMENT_COMMAND,
  $getSelection,
  $isRangeSelection,
  $createParagraphNode,
  $getNodeByKey,
} from "lexical";
import { $isLinkNode, TOGGLE_LINK_COMMAND } from "@lexical/link";
import {
  $isParentElementRTL,
  $wrapNodes,
  $isAtNodeEnd,
} from "@lexical/selection";
import { $getNearestNodeOfType, mergeRegister } from "@lexical/utils";
import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  REMOVE_LIST_COMMAND,
  $isListNode,
  ListNode,
} from "@lexical/list";
import { createPortal } from "react-dom";
import {
  $createHeadingNode,
  $createQuoteNode,
  $isHeadingNode,
} from "@lexical/rich-text";
import {
  $createCodeNode,
  $isCodeNode,
  getDefaultCodeLanguage,
  getCodeLanguages,
} from "@lexical/code";

import { $generateHtmlFromNodes, $generateNodesFromDOM } from "@lexical/html";

const LowPriority = 1;

const supportedBlockTypes = new Set([
  "paragraph",
  "quote",
  "code",
  "h1",
  "h2",
  "ul",
  "ol",
]);

const blockTypeToBlockName = {
  code: "Code Block",
  h1: "Large Heading",
  h2: "Small Heading",
  h3: "Heading",
  h4: "Heading",
  h5: "Heading",
  ol: "Numbered List",
  paragraph: "Normal",
  quote: "Quote",
  ul: "Bulleted List",
};

function Divider() {
  return <div className="divider" />;
}

function positionEditorElement(editor, rect) {
  if (rect === null) {
    editor.style.opacity = "0";
    editor.style.top = "-1000px";
    editor.style.left = "-1000px";
  } else {
    editor.style.opacity = "1";
    editor.style.top = `${rect.top + rect.height + window.pageYOffset + 10}px`;
    editor.style.left = `${
      rect.left + window.pageXOffset - editor.offsetWidth / 2 + rect.width / 2
    }px`;
  }
}

function FloatingLinkEditor({ editor }) {
  const editorRef = useRef(null);
  const inputRef = useRef(null);
  // const [editor] = useLexicalComposerContext();
  const mouseDownRef = useRef(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [isEditMode, setEditMode] = useState(false);
  const [lastSelection, setLastSelection] = useState(null);

  useEffect(() => {
    const unregister = mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          // Save the editor state to localStorage
          const serializedState = JSON.stringify(editorState);
          localStorage.setItem("editorState", serializedState);
          console.log("Editor state saved:", serializedState);
        });
      })
    );

    return () => {
      unregister();
    };
  }, [editor]);

  const updateLinkEditor = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      const node = getSelectedNode(selection);
      const parent = node.getParent();
      if ($isLinkNode(parent)) {
        setLinkUrl(parent.getURL());
      } else if ($isLinkNode(node)) {
        setLinkUrl(node.getURL());
      } else {
        setLinkUrl("");
      }
    }
    const editorElem = editorRef.current;
    const nativeSelection = window.getSelection();
    const activeElement = document.activeElement;

    if (editorElem === null) {
      return;
    }

    const rootElement = editor.getRootElement();
    if (
      selection !== null &&
      !nativeSelection.isCollapsed &&
      rootElement !== null &&
      rootElement.contains(nativeSelection.anchorNode)
    ) {
      const domRange = nativeSelection.getRangeAt(0);
      let rect;
      if (nativeSelection.anchorNode === rootElement) {
        let inner = rootElement;
        while (inner.firstElementChild != null) {
          inner = inner.firstElementChild;
        }
        rect = inner.getBoundingClientRect();
      } else {
        rect = domRange.getBoundingClientRect();
      }

      if (!mouseDownRef.current) {
        positionEditorElement(editorElem, rect);
      }
      setLastSelection(selection);
    } else if (!activeElement || activeElement.className !== "link-input") {
      positionEditorElement(editorElem, null);
      setLastSelection(null);
      setEditMode(false);
      setLinkUrl("");
    }

    return true;
  }, [editor]);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateLinkEditor();
        });
      }),

      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        () => {
          updateLinkEditor();
          return true;
        },
        LowPriority
      )
    );
  }, [editor, updateLinkEditor]);

  useEffect(() => {
    editor.getEditorState().read(() => {
      updateLinkEditor();
    });
  }, [editor, updateLinkEditor]);

  useEffect(() => {
    if (isEditMode && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditMode]);

  return (
    <div ref={editorRef} className="link-editor">
      {isEditMode ? (
        <input
          ref={inputRef}
          className="link-input"
          value={linkUrl}
          onChange={(event) => {
            setLinkUrl(event.target.value);
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              if (lastSelection !== null) {
                if (linkUrl !== "") {
                  editor.dispatchCommand(TOGGLE_LINK_COMMAND, linkUrl);
                }
                setEditMode(false);
              }
            } else if (event.key === "Escape") {
              event.preventDefault();
              setEditMode(false);
            }
          }}
        />
      ) : (
        <>
          <div className="link-input">
            <a href={linkUrl} target="_blank" rel="noopener noreferrer">
              {linkUrl}
            </a>
            <div
              className="link-edit"
              role="button"
              tabIndex={0}
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => {
                setEditMode(true);
              }}
            />
          </div>
        </>
      )}
    </div>
  );
}

function Select({ onChange, className, options, value }) {
  return (
    <select className={className} onChange={onChange} value={value}>
      <option hidden={true} value="" />
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

function getSelectedNode(selection) {
  const anchor = selection.anchor;
  const focus = selection.focus;
  const anchorNode = selection.anchor.getNode();
  const focusNode = selection.focus.getNode();
  if (anchorNode === focusNode) {
    return anchorNode;
  }
  const isBackward = selection.isBackward();
  if (isBackward) {
    return $isAtNodeEnd(focus) ? anchorNode : focusNode;
  } else {
    return $isAtNodeEnd(anchor) ? focusNode : anchorNode;
  }
}

function BlockOptionsDropdownList({
  editor,
  blockType,
  toolbarRef,
  setShowBlockOptionsDropDown,
}) {
  const dropDownRef = useRef(null);

  useEffect(() => {
    const toolbar = toolbarRef.current;
    const dropDown = dropDownRef.current;

    if (toolbar !== null && dropDown !== null) {
      const { top, left } = toolbar.getBoundingClientRect();
      dropDown.style.top = `${top + 40}px`;
      dropDown.style.left = `${left}px`;
    }
  }, [dropDownRef, toolbarRef]);

  useEffect(() => {
    const dropDown = dropDownRef.current;
    const toolbar = toolbarRef.current;

    if (dropDown !== null && toolbar !== null) {
      const handle = (event) => {
        const target = event.target;

        if (!dropDown.contains(target) && !toolbar.contains(target)) {
          setShowBlockOptionsDropDown(false);
        }
      };
      document.addEventListener("click", handle);

      return () => {
        document.removeEventListener("click", handle);
      };
    }
  }, [dropDownRef, setShowBlockOptionsDropDown, toolbarRef]);

  const formatParagraph = () => {
    if (blockType !== "paragraph") {
      editor.update(() => {
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
          $wrapNodes(selection, () => $createParagraphNode());
        }
      });
    }
    setShowBlockOptionsDropDown(false);
  };

  const formatLargeHeading = () => {
    if (blockType !== "h1") {
      editor.update(() => {
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
          $wrapNodes(selection, () => $createHeadingNode("h1"));
        }
      });
    }
    setShowBlockOptionsDropDown(false);
  };

  const formatSmallHeading = () => {
    if (blockType !== "h2") {
      editor.update(() => {
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
          $wrapNodes(selection, () => $createHeadingNode("h2"));
        }
      });
    }
    setShowBlockOptionsDropDown(false);
  };

  const formatBulletList = () => {
    if (blockType !== "ul") {
      editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND);
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND);
    }
    setShowBlockOptionsDropDown(false);
  };

  const formatNumberedList = () => {
    if (blockType !== "ol") {
      editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND);
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND);
    }
    setShowBlockOptionsDropDown(false);
  };

  const formatQuote = () => {
    if (blockType !== "quote") {
      editor.update(() => {
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
          $wrapNodes(selection, () => $createQuoteNode());
        }
      });
    }
    setShowBlockOptionsDropDown(false);
  };

  const formatCode = () => {
    if (blockType !== "code") {
      editor.update(() => {
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
          $wrapNodes(selection, () => $createCodeNode());
        }
      });
    }
    setShowBlockOptionsDropDown(false);
  };

  return (
    <div className="dropdown" ref={dropDownRef}>
      <button className="item" onClick={formatLargeHeading}>
        <span className="icon large-heading" />
        <span className="text">Large Heading</span>
        {blockType === "h1" && <span className="active" />}
      </button>
      <button className="item" onClick={formatSmallHeading}>
        <span className="icon small-heading" />
        <span className="text">Small Heading</span>
        {blockType === "h2" && <span className="active" />}
      </button>
      <button className="item" onClick={formatBulletList}>
        <span className="icon bullet-list" />
        <span className="text">Bullet List</span>
        {blockType === "ul" && <span className="active" />}
      </button>
      <button className="item" onClick={formatNumberedList}>
        <span className="icon numbered-list" />
        <span className="text">Numbered List</span>
        {blockType === "ol" && <span className="active" />}
      </button>
      <button className="item" onClick={formatQuote}>
        <span className="icon quote" />
        <span className="text">Quote</span>
        {blockType === "quote" && <span className="active" />}
      </button>
      <button className="item" onClick={formatCode}>
        <span className="icon code" />
        <span className="text">Code Block</span>
        {blockType === "code" && <span className="active" />}
      </button>
    </div>
  );
}

const symbols = [
  { symbol: "+", name: "Addition" },
  { symbol: "−", name: "Subtraction" },
  { symbol: "×", name: "Multiplication" },
  { symbol: "÷", name: "Division" },
  { symbol: "=", name: "Equal" },
  { symbol: "≠", name: "Not Equal" },
  { symbol: ">", name: "Greater Than" },
  { symbol: "<", name: "Less Than" },
  { symbol: "≥", name: "Greater Than or Equal To" },
  { symbol: "≤", name: "Less Than or Equal To" },
  { symbol: "π", name: "Pi" },
  { symbol: "√", name: "Square Root" },
  { symbol: "∞", name: "Infinity" },
  { symbol: "∑", name: "Summation" },
  { symbol: "∫", name: "Integral" },
  { symbol: "Δ", name: "Delta" },
  { symbol: "∠", name: "Angle" },
  { symbol: "°", name: "Degree" },
  { symbol: "sin", name: "Sine" },
  { symbol: "cos", name: "Cosine" },
  { symbol: "tan", name: "Tangent" },
  { symbol: "csc", name: "Cosecant" },
  { symbol: "sec", name: "Secant" },
  { symbol: "cot", name: "Cotangent" },
  { symbol: "²", name: "Power of Two" },
  { symbol: "³", name: "Power of Three" },
  { symbol: "θ", name: "Theta" },
  { symbol: "φ", name: "Phi" },
  { symbol: "mod", name: "Modulo" },
  { symbol: "!", name: "Factorial" },
  { symbol: "α", name: "Alpha" },
  { symbol: "β", name: "Beta" },
  { symbol: "γ", name: "Gamma" },
];

export default function ToolbarPlugin({
  questions,
  index,
  setQuestions,
  questionList,
}) {
  const [editor] = useLexicalComposerContext();
  const toolbarRef = useRef(null);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [blockType, setBlockType] = useState("paragraph");
  const [selectedElementKey, setSelectedElementKey] = useState(null);
  const [showBlockOptionsDropDown, setShowBlockOptionsDropDown] =
    useState(false);
  const [codeLanguage, setCodeLanguage] = useState("");
  const [isRTL, setIsRTL] = useState(false);
  const [isLink, setIsLink] = useState(false);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);
  const [isCode, setIsCode] = useState(false);
  const [textSize, setTextSize] = useState(16);
  const [fontSizeChange, setFontSizeChange] = useState(1);
  const [fontStyleChange, setFontStyleChange] = useState("Arial");
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [fontColorChange, setFontColorChange] = useState("#000000"); // Default color black
  const currentUrl = window.location.href.slice(32);
  console.log(currentUrl);

  useEffect(() => {
    const unregister = editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        let tempQuestions = [...questions];
        const htmlContent = $generateHtmlFromNodes(editor, null);
        tempQuestions[index].title = htmlContent;
        localStorage.setItem("editorContentHTML", htmlContent);
      });
    });

    return () => {
      unregister();
    };
  }, [editor, questions, index]);

  const handleColorChange = (color) => {
    setFontColorChange(color.hex);
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        selection.getNodes().forEach((node) => {
          if (node.getType() === "text") {
            node.setStyle(`color: ${color.hex}`);
          }
        });
      }
    });
  };

  const updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      const anchorNode = selection.anchor.getNode();
      const element =
        anchorNode.getKey() === "root"
          ? anchorNode
          : anchorNode.getTopLevelElementOrThrow();
      const elementKey = element.getKey();
      const elementDOM = editor.getElementByKey(elementKey);
      if (elementDOM !== null) {
        setSelectedElementKey(elementKey);
        if ($isListNode(element)) {
          const parentList = $getNearestNodeOfType(anchorNode, ListNode);
          const type = parentList ? parentList.getTag() : element.getTag();
          setBlockType(type);
        } else {
          const type = $isHeadingNode(element)
            ? element.getTag()
            : element.getType();
          setBlockType(type);
          if ($isCodeNode(element)) {
            setCodeLanguage(element.getLanguage() || getDefaultCodeLanguage());
          }
        }
      }
      setIsBold(selection.hasFormat("bold"));
      setIsItalic(selection.hasFormat("italic"));
      setIsUnderline(selection.hasFormat("underline"));
      setIsStrikethrough(selection.hasFormat("strikethrough"));
      setIsCode(selection.hasFormat("code"));
      setIsRTL($isParentElementRTL(selection));

      const node = getSelectedNode(selection);
      const parent = node.getParent();
      setIsLink($isLinkNode(parent) || $isLinkNode(node));
    }
  }, [editor]);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateToolbar();
        });
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        (_payload, newEditor) => {
          updateToolbar();
          return false;
        },
        LowPriority
      ),
      editor.registerCommand(
        CAN_UNDO_COMMAND,
        (payload) => {
          setCanUndo(payload);
          return false;
        },
        LowPriority
      ),
      editor.registerCommand(
        CAN_REDO_COMMAND,
        (payload) => {
          setCanRedo(payload);
          return false;
        },
        LowPriority
      )
    );
  }, [editor, updateToolbar]);

  const codeLanguges = useMemo(() => getCodeLanguages(), []);
  const onCodeLanguageSelect = useCallback(
    (e) => {
      editor.update(() => {
        if (selectedElementKey !== null) {
          const node = $getNodeByKey(selectedElementKey);
          if ($isCodeNode(node)) {
            node.setLanguage(e.target.value);
          }
        }
      });
    },
    [editor, selectedElementKey]
  );

  const insertLink = useCallback(() => {
    editor.dispatchCommand(TOGGLE_LINK_COMMAND, isLink ? null : "https://");
  }, [editor, isLink]);

  const increaseTextSize = useCallback(() => {
    const sizeChange = Math.min(fontSizeChange, 72);
    setTextSize((prevSize) => Math.min(prevSize + sizeChange, 72));

    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        selection.getNodes().forEach((node) => {
          if (node.getType() === "text") {
            const newSize = Math.min(textSize + sizeChange, 72);
            node.setStyle(`font-size: ${newSize}px`);
          }
        });
      }
    });
  }, [editor, textSize, fontSizeChange]);

  const decreaseTextSize = useCallback(() => {
    setTextSize((prevSize) => Math.max(prevSize - fontSizeChange, 1));
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        selection.getNodes().forEach((node) => {
          if (node.getType() === "text") {
            node.setStyle(`font-size: ${textSize - fontSizeChange}px`);
          }
        });
      }
    });
  }, [editor, textSize, fontSizeChange]);

  const insertSymbol = useCallback(
    (symbol) => {
      editor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          selection.insertText(symbol);
        }
      });
    },
    [editor]
  );

  // useEffect(() => {
  //   let tempQuestions = [...questions];
  //   const currentype = localStorage.getItem("questions") ? JSON.parse(localStorage.getItem("questions"))[index] : null;
  //   tempQuestions[index].type = "";
  //   setQuestions(tempQuestions);
  // }, [index, questions, setQuestions]);

  useEffect(() => {
    const storedType = localStorage.getItem(`questiontype_${index}`);
    if (storedType) {
      let tempQuestions = [...questions];
      tempQuestions[index].type = JSON.parse(storedType);
      setQuestions(tempQuestions);
    }
  }, [index]);

  const fontsizelist = [10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 36, 48, 72];

  return (
    <div className="toolbar " ref={toolbarRef}>
      {currentUrl !== "createpoll" &&  questionList !== undefined && questionList !== null  && (
        <select
          id="question-type"
          title="Question Type"
          className="w-32 rounded-lg border-2 border-[#1D4ED8] bg-white text-center text-xs text-[#8C8C8C] outline-none focus:outline-none "
          value={questions[index].type}
          onChange={(e) => {
            let tempQuestions = [...questions];
            tempQuestions[index].type = e.target.value;
            setQuestions(tempQuestions);
            console.log(questions)
            localStorage.setItem(`questiontype_${index}`, JSON.stringify(tempQuestions[index].type));
            // localStorage.setItem("questionData", JSON.stringify(tempQuestions));
          }}
        >
          <option className="bg-gray-50 " value="null" selected>
            Question Type
          </option>
          { questionList !== undefined && questionList !== null && questionList.map(
            (item) =>
              item.isActive && (
                <option
                  key={item.value}
                  className="flex cursor-pointer items-center p-2 hover:bg-gray-100"
                  value={item.value}
                >
                  {item.name
                    .trim()
                    .toLowerCase()
                    .replace(/^\w/, (c) => c.toUpperCase())}
                </option>
              )
          )}
        </select>
      )}

      <Divider />
      <select
        title="font style"
        value={fontStyleChange}
        onChange={(e) => {
          const newFontStyle = e.target.value;
          editor.update(() => {
            const selection = $getSelection();
            if ($isRangeSelection(selection)) {
              selection.getNodes().forEach((node) => {
                if (node.getType() === "text") {
                  setFontStyleChange(newFontStyle);
                  node.setStyle(`font-family: ${newFontStyle}`);
                }
              });
            }
          });
        }}
        className="w-32 rounded-lg border-2 border-[#1D4ED8] bg-white text-center text-xs text-[#8C8C8C] outline-none focus:outline-none "
      >
        {["Arial", "Courier New", "Georgia", "Times New Roman", "Verdana"].map(
          (font) => (
            <option className="text-sm" key={font} value={font}>
              {font}
            </option>
          )
        )}
      </select>

      {blockType === "code" ? (
        <>
          <Select
            className="toolbar-item code-language"
            onChange={onCodeLanguageSelect}
            options={codeLanguges}
            value={codeLanguage}
          />
          <i className="chevron-down inside" />
        </>
      ) : (
        <>
          {/* <select
            value={textSize}
            title="Font Size"
            onChange={(e) => {
              const newSize = e.target.value;
              editor.update(() => {
                const selection = $getSelection();
                if ($isRangeSelection(selection)) {
                  selection.getNodes().forEach((node) => {
                    if (node.getType() === "text") {
                      setTextSize(newSize);
                      node.setStyle(`font-size: ${newSize}px`);
                    }
                  });
                }
              });
            }}
            className=" ml-2 rounded-lg border-2 border-[#1D4ED8] bg-white text-center text-xs text-[#8C8C8C] outline-none focus:outline-none "
          >
            {fontsizelist.map((size) => (
              <option className="w-10 " key={size} value={size}>
                {size}
              </option>
            ))}
          </select> */}
           <select
            value={textSize}
            title="Font Size"
            onChange={(e) => {
              const newSize = e.target.value;

              editor.update(() => {
                const selection = $getSelection();
                if ($isRangeSelection(selection)) {
                  selection.getNodes().forEach((node) => {
                    if (node.getType() === "text") {
                      // Get the current style of the node
                      const currentStyle = node.getStyle() || "";
                      const updatedStyle = currentStyle
                        .split(";")
                        .filter(
                          (style) => !style.trim().startsWith("font-size")
                        )
                        .concat(`font-size: ${newSize}px`)
                        .join("; ");

                      // Update the style with the new font size
                      node.setStyle(updatedStyle);

                      // Update local state for the select value
                      setTextSize(newSize);
                    }
                  });
                }
              });
            }}
            className="ml-2 rounded-lg border-2 border-[#1D4ED8] bg-white text-center text-xs text-[#8C8C8C] outline-none focus:outline-none"
          >
            {fontsizelist.map((size) => (
              <option className="w-10" key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
          <button
            title="Increase Font Size"
            onClick={() => setDisplayColorPicker(!displayColorPicker)}
            className="toolbar-item border-zinc[#1D4ED8]ext-center rounded-xl border-2 text-[#8C8C8C]  focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="20"
              height="20"
              fill="currentColor"
            >
              <path d="M15.2459 14H8.75407L7.15407 18H5L11 3H13L19 18H16.8459L15.2459 14ZM14.4459 12L12 5.88516L9.55407 12H14.4459ZM3 20H21V22H3V20Z"></path>
            </svg>
          </button>

          {/* Color Picker Popover */}
          {displayColorPicker && (
            <div style={{ position: "absolute", zIndex: 2 }}>
              <div
                style={{
                  position: "fixed",
                  top: 0,
                  right: 0,
                  bottom: 0,
                  left: 0,
                }}
                onClick={() => setDisplayColorPicker(false)}
              />
              <SketchPicker
                color={fontColorChange}
                onChange={handleColorChange}
                disableAlpha={true}
              />
            </div>
          )}
          <Divider />
          <button
            title="Increase Font Size"
            onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")}
            className={"toolbar-item spaced " + (isBold ? "active" : "")}
            aria-label="Format Bold"
          >
            <i className="format bold" />
          </button>

          <button
            title="FONT FORMAT ITALIC"
            onClick={() =>
              editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")
            }
            className={"toolbar-item spaced " + (isItalic ? "active" : "")}
            aria-label="Format Italics"
          >
            <i className="format italic" />
          </button>
          <button
            title="FONT FORMAT UNDERLINE"
            onClick={() =>
              editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline")
            }
            className={"toolbar-item spaced " + (isUnderline ? "active" : "")}
            aria-label="Format Underline"
          >
            <i className="format underline" />
          </button>

          {/* <button
            onClick={insertLink}
            className={"toolbar-item spaced " + (isLink ? "active" : "")}
            aria-label="Insert Link"
          >
            <i className="format link" />
          </button> */}
          {isLink &&
            createPortal(<FloatingLinkEditor editor={editor} />, document.body)}
          <Divider />
          <button
            onClick={() =>
              editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "left")
            }
            className="toolbar-item spaced"
            aria-label="Left Align"
          >
            <i className="format left-align" />
          </button>
          <button
            title="Center Align"
            onClick={() =>
              editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "center")
            }
            className="toolbar-item spaced"
            aria-label="Center Align"
          >
            <i className="format center-align" />
          </button>
          <button
            title="Right Align"
            onClick={() =>
              editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "right")
            }
            className="toolbar-item spaced"
            aria-label="Right Align"
          >
            <i className="format right-align" />
          </button>
          <button
            title="Justify Align"
            onClick={() =>
              editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "justify")
            }
            className="toolbar-item"
            aria-label="Justify Align"
          >
            <i className="format justify-align" />
          </button>
          <Divider />
          <button
            title="Subscript"
            onClick={() =>
              editor.dispatchCommand(FORMAT_TEXT_COMMAND, "subscript")
            }
            className="toolbar-item spaced text-[#8C8C8C]"
            aria-label="Insert Subscript"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="20"
              height="20"
              fill="currentColor"
            >
              <path d="M5.59567 4L10.5 9.92831L15.4043 4H18L11.7978 11.4971L18 18.9943V19H15.4091L10.5 13.0659L5.59092 19H3V18.9943L9.20216 11.4971L3 4H5.59567ZM21.8 16C21.8 15.5582 21.4418 15.2 21 15.2C20.5582 15.2 20.2 15.5582 20.2 16C20.2 16.0762 20.2107 16.15 20.2306 16.2198L19.0765 16.5496C19.0267 16.375 19 16.1906 19 16C19 14.8954 19.8954 14 21 14C22.1046 14 23 14.8954 23 16C23 16.5727 22.7593 17.0892 22.3735 17.4538L20.7441 19H23V20H19V19L21.5507 16.5803C21.7042 16.4345 21.8 16.2284 21.8 16Z"></path>
            </svg>
          </button>
          <button
            title="Superscript"
            onClick={() =>
              editor.dispatchCommand(FORMAT_TEXT_COMMAND, "superscript")
            }
            className="toolbar-item spaced text-[#8C8C8C]"
            aria-label="Insert Superscript"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="20"
              height="20"
              fill="currentColor"
            >
              <path d="M5.59567 5L10.5 10.9283L15.4043 5H18L11.7978 12.4971L18 19.9943V20H15.4091L10.5 14.0659L5.59092 20H3V19.9943L9.20216 12.4971L3 5H5.59567ZM21.5507 6.5803C21.7042 6.43453 21.8 6.22845 21.8 6C21.8 5.55817 21.4418 5.2 21 5.2C20.5582 5.2 20.2 5.55817 20.2 6C20.2 6.07624 20.2107 6.14999 20.2306 6.21983L19.0765 6.54958C19.0267 6.37497 19 6.1906 19 6C19 4.89543 19.8954 4 21 4C22.1046 4 23 4.89543 23 6C23 6.57273 22.7593 7.08923 22.3735 7.45384L20.7441 9H23V10H19V9L21.5507 6.5803V6.5803Z"></path>
            </svg>
          </button>
          <button
            title="Unordered List"
            onClick={() =>
              editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND)
            }
            className="toolbar-item spaced text-[#8C8C8C]"
            aria-label="Insert Bullet List"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="20"
              height="20"
              fill="currentColor"
            >
              <path d="M8 4H21V6H8V4ZM4.5 6.5C3.67157 6.5 3 5.82843 3 5C3 4.17157 3.67157 3.5 4.5 3.5C5.32843 3.5 6 4.17157 6 5C6 5.82843 5.32843 6.5 4.5 6.5ZM4.5 13.5C3.67157 13.5 3 12.8284 3 12C3 11.1716 3.67157 10.5 4.5 10.5C5.32843 10.5 6 11.1716 6 12C6 12.8284 5.32843 13.5 4.5 13.5ZM4.5 20.4C3.67157 20.4 3 19.7284 3 18.9C3 18.0716 3.67157 17.4 4.5 17.4C5.32843 17.4 6 18.0716 6 18.9C6 19.7284 5.32843 20.4 4.5 20.4ZM8 11H21V13H8V11ZM8 18H21V20H8V18Z"></path>
            </svg>
          </button>
          <select
            title="Insert Symbol"
            onChange={(e) => insertSymbol(e.target.value)}
            className=" w-10 rounded-xl bg-white  text-center  text-[#8F8F8F] focus:outline-none"
            name=""
            id=""
          >
            <option default className="" value="">
              Σ
            </option>
            {symbols.map((item, index) => (
              <option key={index} value={item.symbol}>
                <strong>{item.symbol}</strong> - {item.name}
              </option>
            ))}
          </select>
          <div className="  flex flex-col ">
            {/* image upload */}
            <input
              className="hidden"
              id={"image-input-" + index}
              type="file"
              accept="image/*"
              onChange={(e) => {
                let tempQuestions = [...questions];
                tempQuestions[index].image = e.target.files[0];
                setQuestions(tempQuestions);
                console.log(questions);
              }}
            />
            <input
              className="hidden"
              id={"audio-input-" + index}
              type="file"
              accept="audio/*"
              onChange={(e) => {
                let tempQuestions = [...questions];
                tempQuestions[index].audio = e.target.files[0];
                setQuestions(tempQuestions);
                console.log(questions);
              }}
            />
            <div className="flex gap-0">
              <BiImageAdd
                className="m-2 h-6 w-6 cursor-pointer text-[#8F8F8F]"
                title="add image"
                onClick={() => {
                  document.getElementById("image-input-" + index).click();
                }}
              />
              <BiMicrophone
                title="add voice"
                className="m-2 h-6 w-6 cursor-pointer text-[#8F8F8F]"
                onClick={() => {
                  document.getElementById("audio-input-" + index).click();
                }}
              />
              <RiYoutubeLine
                className="m-2 h-6 w-6 cursor-pointer text-[#8F8F8F]"
                title="add youtube video link"
                onClick={() => {
                  let tempQuestions = [...questions];
                  tempQuestions[index].youtube = prompt(
                    "Enter youtube Embed Link via Share option (Not Video Link)"
                  );
                  setQuestions(tempQuestions);
                  console.log(questions);
                }}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
