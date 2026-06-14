import React, { useEffect, useState } from "react";
import ExampleTheme from "./themes/ExampleTheme";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import TreeViewPlugin from "./plugins/TreeViewPlugin";
import ToolbarPlugin from "./plugins/ToolbarPlugin";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";
import { ListItemNode, ListNode } from "@lexical/list";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { TRANSFORMERS } from "@lexical/markdown";
import ListMaxIndentLevelPlugin from "./plugins/ListMaxIndentLevelPlugin";
import CodeHighlightPlugin from "./plugins/CodeHighlightPlugin";
import AutoLinkPlugin from "./plugins/AutoLinkPlugin";
import { ColoredTextNode } from "./nodes/ColoredTextNode";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import swal from "sweetalert";

function Placeholder({ questionstype }) {
  return (
    <div className="editor-placeholder">
      {questionstype === ""
        ? "Please select the question type..."
        : "Type your question here..."}
    </div>
  );
}



export default function Editor({
  questions,
  index,
  setQuestions,
  questionList,
}) {
  const [editorState, setEditorState] = useState(null);

  useEffect(() => {
    // Load the saved editor state from localStorage
    const savedState = localStorage.getItem("editorState");
    if (savedState) {
      setEditorState(JSON.parse(savedState));
    }
  }, []);

  const handleEditorChange = (editorState) => {
    // Save the editor state to localStorage
    localStorage.setItem("editorState", JSON.stringify(editorState));
    // console.log(editorState);
    setEditorState(editorState);
  };

  console.log(questions[index].type);

  console.log();

  function convertHTMLToLexicalData(htmlString) {
    // Create a DOM parser to parse the HTML string
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");
  
    // Extract text content and direction from the parsed HTML
    const paragraphElement = doc.body.firstElementChild;
    const textContent = paragraphElement?.textContent;
    const direction = paragraphElement?.getAttribute("dir") || "ltr";
  
    // Construct the data structure
    const initialContent = {
      root: {
        children: [
          {
            children: [
              {
                detail: 0,
                format: 0,
                mode: "normal",
                style: "",
                text: textContent?.trim(), // Get the text content and trim whitespace
                type: "text",
                version: 1,
              },
            ],
            direction: direction,
            format: "",
            indent: 0,
            type: "paragraph",
            version: 1,
          },
        ],
        direction: "ltr",
        format: "",
        indent: 0,
        type: "root",
        version: 1,
      },
    };
  
    return initialContent;
  }
  
  // Example usage
  const questionData = JSON.parse(localStorage.getItem("questionData")) || JSON.parse(localStorage.getItem("questions"));
  const htmlString = questionData ? questionData[index]?.title : null;
  const initialContent = 
    htmlString ? convertHTMLToLexicalData(htmlString) : null
  ;
  
  // console.log(questionData[index]?.title)
  // console.log(initialContent);
  // console.log(convertHTMLToLexicalData(htmlString))
  

  useEffect(() => {
    if(JSON.parse(localStorage.getItem("questionData"))){
      setEditorState(JSON.parse(localStorage.getItem("questionData")))
    }else{
      setEditorState(JSON.parse(localStorage.getItem("questions")))
    }
  }
  ,[localStorage.getItem("questionData")])



  // console.log(JSON.parse(localStorage.getItem("questionData"))[index]?.title);

  const editorConfig = {
    theme: ExampleTheme,
    onError(error) {
      throw error;
    },
    nodes: [
      HeadingNode,
      ListNode,
      ListItemNode,
      CodeNode,
      CodeHighlightNode,
      TableNode,
      TableCellNode,
      TableRowNode,
      AutoLinkNode,
      LinkNode,
      ColoredTextNode, // Register the node here
    ],
  };

  // Plugin to initialize the editor content
function InitializeEditorPlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
   if(localStorage.getItem("questionData"))
    if( 

      JSON.parse(localStorage.getItem("questionData"))[index]?.title
    
     ){
       editor.update(() => {
        if (initialContent) {
          const state = editor?.parseEditorState(initialContent);
          editor.setEditorState(state);
        }

      });
      console.log("hi")
     }
     else {
        if( JSON.parse(localStorage.getItem("questions")) > JSON.parse(localStorage.getItem("questionData")) &&   JSON.parse(localStorage.getItem("questions"))[index]?.title){
          editor.update(() => {
            if (initialContent) {
              const state = editor?.parseEditorState(initialContent);
              editor.setEditorState(state);
            }
    
          });
          console.log("hi")
        }
     }
  }, [editor]);

  return null;
}


console.log(questions[index].type)


  return (
    <LexicalComposer initialConfig={editorConfig}>
      <InitializeEditorPlugin />
      <div className="editor-container w-full ">
        <ToolbarPlugin
          questions={questions}
          index={index}
          setQuestions={setQuestions}
          questionList={questionList}
        />
        <div className="editor-inner h-32 w-full rounded-lg  border-2 border-[#1D4ED8]">
          {questions[index].type !== null && questions[index].type !== 'null' && questions[index].type !== undefined   ? 
          <RichTextPlugin
            contentEditable={<ContentEditable className="editor-input " />}
            placeholder={<Placeholder questionstype={questions[index]?.type} />}
            ErrorBoundary={LexicalErrorBoundary}
          /> 
          : 
          <div 
          onClick={()=>swal("Please select a question Type first")}
           className="w-full bg-transparent h-full"></div>
           }
          
          {/* <HistoryPlugin /> */}
          {/* <TreeViewPlugin /> */}
          {/* <AutoFocusPlugin />
          <CodeHighlightPlugin />
          <ListPlugin />
          <LinkPlugin />
          <AutoLinkPlugin />
          <ListMaxIndentLevelPlugin maxDepth={7} />
          <MarkdownShortcutPlugin transformers={TRANSFORMERS} /> */}
        </div>
      </div>
    </LexicalComposer>
  );
}
