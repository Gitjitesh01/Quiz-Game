import { useState, useEffect } from "react" 
import axios from 'axios';
import  { countBy } from "lodash";
import ReactWordcloud from 'react-wordcloud';

const WordCloudData = () => {
    const [pollData,setPollData]=useState(null)
    const [ wordcloudData, setWordCloudData ]=useState([])
    const searchParams = new URLSearchParams(window.location.search);
    const id = searchParams.get('data');
    const FetchPollData= async()=>{
      try {
        const res=await axios.get(`https://letsquiz.org/api/quiz/${id}`)
        
        setPollData(res.data.quiz)
        const data = res.data.quiz.questions.map(e => {
          return Object.entries(countBy(e.wordcloud)).map(([word, frequency]) => ({
            text: word,
            value: frequency,
          }))
        });
        setWordCloudData(data);
      } catch (error) {
        console.log(error);
      }
    }
    
    useEffect(() => {
      FetchPollData()
    }, [])
    console.log(pollData);

    if(!pollData) return <p>Loading</p>
    
    console.log(id)
    // const chartData = countBy(pollData.wordcloud.filter((e) => e))
    // const wordCloudData = Object.entries(chartData).map(([word, frequency]) => ({
    //   text: word,
    //   value: frequency,
    // }));
    return (
      <div className='bar-container'>
        {/* <h1  dangerouslySetInnerHTML={{ __html: pollData?.questions.flatMap((el)=>`Q. ${el.title}`) }}></h1> */}
        {/* <ReactWordcloud words={wordCloudData}/> */}
        {
          pollData?.questions.map((v, i) => {
            const wc = wordcloudData[i];

            return <div key={`wc${i}`}>
              <h1 className="" dangerouslySetInnerHTML={{ __html: `Q${i+1}.${v.title}`}}></h1>
              <ReactWordcloud  words={wc} options={{fontSizes: [5, 60]}}/>
            </div>

          })
        }
      </div>
    );
  };
  
  export default WordCloudData;
  