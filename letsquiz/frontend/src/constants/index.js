import first_img from "../assets/carousel_images/1.jpg";
import second_img from "../assets/carousel_images/2.jpg";
import third_img from "../assets/carousel_images/3.jpg";
import fourth_img from "../assets/carousel_images/4.jpg";
import fifth_img from "../assets/carousel_images/5.jpg";
import sixth_img from "../assets/carousel_images/6.jpg";
import seventh_img from "../assets/carousel_images/7.jpg";
import eighth_img from "../assets/carousel_images/8.jpg";
import img_1 from "../assets/img/paragrafh/image.png";
import img_2 from "../assets/img/paragrafh/image1.png";
const navLinks = [
  {
    id: "home",
    title: "Home",
    url: "/",
  },
  {
    id: "about",
    title: "About",
    url: "/about",
  },
  {
    id: "features",
    title: "Features",
    url: "/features",
  },
  {
    id: "testimonials",
    title: "Testimonials",
    url: "/testimonials",
  },
];

const HomePageStats = [
  {
    id: 1,
    title: "Students",
    stat: "60K",
  },
  {
    id: 2,
    title: "Teachers",
    stat: "30K",
  },
  {
    id: 3,
    title: "Corporate",
    stat: "60K",
  },
  {
    id: 4,
    title: "Countries",
    stat: "40+",
  },
];

const testmonials = [
  {
    id: 1,
    title: "Students",
    description:
      "Attend your exams with fun Learn any type of content and topic by attending different types of Quizzes and test created by the subject experts",
  },
  {
    id: 2,
    title: "Teachers",
    description:
      "Keep your students engaged to assess their understanding and knowledge Make the exams interesting and fun for the students Get accurate and faster results Save cost of physical evaluation Create any form of tests from kindergarten to university level",
  },
  {
    id: 3,
    title: "Corporate",
    description:
      "Conduct interview through various assessment tools available in Letsquiz Make instant decision with the Realtime response from the audience through polls and word cloud",
  },
];

const homeCarousel = [
  {
    id: 1,
    title: "MULTIPLE CHOICE",
    img: first_img,
  },
  {
    id: 2,
    title: "POLL",
    img: second_img,
  },
  {
    id: 3,
    title: "WORD CLOUD",
    img: third_img,
  },
  {
    id: 4,
    title: "TRUE and FALSE",
    img: fourth_img,
  },
  {
    id: 5,
    title: "DRAG & DROP",
    img: fifth_img,
  },
  {
    id: 6,
    title: "SURVEY",
    img: sixth_img,
  },
  {
    id: 7,
    title: "MATCHING",
    img: seventh_img,
  },
  {
    id: 8,
    title: "FILL UP",
    img: eighth_img,
  },
  {
    id: 9,
    title: "SHORT ANSWER",
    img: eighth_img,
  },
];

const homepagedata = [
  {
    id: 1,
    title: "General Knowledge Quiz",
    image: img_1,
    viewimage:"https://kwizzbit.com/wp-content/uploads/2022/05/General-Knowledge-Quiz-Questions-min.jpg.webp",
    description:
      "Test your general knowledge with this fun and challenging quiz. Answer a series of questions covering various topics, including history, science, literature, and more. This quiz is designed to test your knowledge across a broad range of subjects and keep you entertained. Whether you are a trivia enthusiast or just looking to challenge yourself, this quiz is perfect for you. Each question is carefully curated to ensure a mix of difficulty levels, making it accessible for everyone. Challenge your friends and family to see who can score the highest and earn bragging rights! Share your results on social media and encourage others to join the fun. Continuous learning has never been this enjoyable. Dive into the quiz now and see how much you know!",
  },
  {
    id: 2,
    title: "Customer Satisfaction Survey",
    image: img_2,
    viewimage:"https://www.questback.com/wp-content/uploads/updated/updated-Customer_Satisfaction_survey-scaled-e1678963547855.jpg",
    description:
      "Help us improve our services by providing your feedback through this comprehensive customer satisfaction survey. This survey is designed to gather your opinions on various aspects of our service, including quality, efficiency, and overall experience. It will take only a few minutes to complete, and all your responses will be kept confidential. Your input is incredibly valuable to us and will play a significant role in shaping our future offerings and enhancements. We aim to create the best possible experience for our customers, and your feedback is the key to our continuous improvement. Whether it’s praise, suggestions, or concerns, we want to hear from you. Your participation will help us understand your needs better and serve you more effectively. Thank you for taking the time to share your thoughts with us.",
  },
  {
    id: 3,
    title: "Favorite Programming Language Poll",
    image: img_1,
    viewimage:"https://miro.medium.com/v2/resize:fit:640/format:webp/1*k571AdZ8qSCegwR74oVWiQ.jpeg",
    description:
      "Vote for your favorite programming language in this quick and exciting poll. Whether you're a fan of Python, JavaScript, C++, Java, or another language, your vote is important! This poll aims to gather insights into the preferences of our tech-savvy community. It’s a great way to see which languages are trending and popular among developers today. Cast your vote and see the results in real-time, allowing you to compare your preferences with those of others in the community. This poll is not just about voting; it’s about sharing your passion for programming and engaging with a community of like-minded individuals. Feel free to discuss your favorite languages, share tips, and learn from others. Your vote will contribute to a larger discussion about programming trends and preferences. Don’t miss the chance to have your voice heard!",
  },
  {
    id: 4,
    title: "Community Feedback",
    image: img_2,
    viewimage:"https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.proxi.co%2Fblog%2Fhow-to-create-a-community-feedback-map&psig=AOvVaw0jNEphcHVhLQoWOKTDBx5m&ust=1722720780282000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCKjLppSh14cDFQAAAAAdAAAAABAE",
    description:
      "We value your feedback and would love to hear from you! This section is dedicated to gathering your thoughts and suggestions about our platform, services, and overall experience. Your feedback is crucial for us to understand what we are doing well and where we can improve. Whether you have ideas for new features, suggestions for improvements, or general comments, we are eager to listen. By sharing your insights, you are helping us create a better experience for everyone. We are committed to continuously enhancing our offerings based on your feedback. This is your opportunity to have a direct impact on the future direction of our services. Your voice matters to us, and we appreciate you taking the time to share your thoughts. Together, we can build a more responsive and user-friendly platform. Thank you for being an active part of our community!",
  },
];

export { navLinks, HomePageStats, homepagedata, testmonials, homeCarousel };
