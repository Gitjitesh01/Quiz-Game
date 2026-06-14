import React from "react";
import swal from "sweetalert";
import indicatetoright from "../../assets/indicatetoright.svg";

("react");
import { homepagedata } from "../../constants";
import Leenjain from "../../assets/Leenjain.png";
import img_1 from "../../assets/img/paragrafh/image.png";
import img_2 from "../../assets/img/paragrafh/image1.png";
import "../../assets/css/Home.css";
const Testimonial = () => {
  return (
    <>
      <section className="my-8 bg-white">
        <div className="flex flex-wrap justify-around gap-8">
          {/* General Knowledge Quiz */}
          <figure className="flex w-full flex-row-reverse gap-28 rounded-xl bg-[#f9fafb] p-6">
            <div className="relative h-fit w-fit">
              <svg
                width="550"
                height="302"
                viewBox="0 0 550 302"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <pattern
                    id="imgPattern1"
                    patternUnits="userSpaceOnUse"
                    width="550"
                    height="302"
                  >
                    <image
                      href="https://kwizzbit.com/wp-content/uploads/2022/05/General-Knowledge-Quiz-Questions-min.jpg.webp"
                      x="0"
                      y="0"
                      width="550"
                      height="302"
                      preserveAspectRatio="xMidYMid slice"
                    />
                  </pattern>
                </defs>
                <path
                  d="M1.98404 149.255L37.332 128.579C37.9453 128.22 38.3222 127.563 38.3222 126.853V3C38.3222 1.89543 39.2176 1 40.3222 1H547C548.105 1 549 1.89543 549 3V299C549 300.105 548.105 301 547 301H40.3222C39.2176 301 38.3222 300.105 38.3222 299V174.66C38.3222 173.943 37.9381 173.28 37.3155 172.924L2.00052 152.717C0.66559 151.953 0.65644 150.031 1.98404 149.255Z"
                  stroke="#207ABD"
                  strokeWidth="2"
                  fill="url(#imgPattern1)"
                />
              </svg>
            </div>
            <div className="flex w-fit gap-4">
              <div className="h-20 w-[150%]">
                <img
                  src={img_1}
                  alt="General Knowledge Quiz"
                  className="h-[100px] w-[100px] object-cover"
                />
              </div>
              <div className="flex flex-col items-start justify-start gap-3">
                <div className="my-2 pr-3 text-2xl font-bold text-[#1D4ED8]">
                  General Knowledge Quiz
                </div>
                <p className="w-full text-start text-sm text-[#828282]">
                  Test your general knowledge with this fun and challenging
                  quiz. Answer a series of questions covering various topics,
                  including history, science, literature, and more. This quiz is
                  designed to test your knowledge across a broad range of
                  subjects and keep you entertained. Whether you are a trivia
                  enthusiast or just looking to challenge yourself, this quiz is
                  perfect for you. Each question is carefully curated to ensure
                  a mix of difficulty levels, making it accessible for everyone.
                  Challenge your friends and family to see who can score the
                  highest and earn bragging rights! Share your results on social
                  media and encourage others to join the fun. Continuous
                  learning has never been this enjoyable. Dive into the quiz now
                  and see how much you know!
                </p>
              </div>
            </div>
          </figure>

          {/* Customer Satisfaction Survey */}
          <figure className="flex w-full gap-28 rounded-xl bg-[#f9fafb] p-6">
            <div className="relative h-fit w-fit">
              <svg
                width="550"
                height="302"
                viewBox="0 0 550 302"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <pattern
                    id="imgPattern2"
                    patternUnits="userSpaceOnUse"
                    width="550"
                    height="302"
                  >
                    <image
                      href="https://www.questback.com/wp-content/uploads/updated/updated-Customer_Satisfaction_survey-scaled-e1678963547855.jpg"
                      x="0"
                      y="0"
                      width="550"
                      height="302"
                      preserveAspectRatio="xMidYMid slice"
                    />
                  </pattern>
                </defs>
                <path
                  d="M548.016 149.255L512.668 128.579C512.055 128.22 511.678 127.563 511.678 126.853V3C511.678 1.89543 510.782 1 509.678 1H3C1.89545 1 1 1.89543 1 3V299C1 300.105 1.89545 301 3 301H509.678C510.782 301 511.678 300.105 511.678 299V174.66C511.678 173.943 512.062 173.28 512.685 172.924L547.999 152.717C549.334 151.953 549.344 150.031 548.016 149.255Z"
                  stroke="#207ABD"
                  strokeWidth="2"
                  fill="url(#imgPattern2)"
                />
              </svg>
            </div>
            <div className="flex w-fit gap-4">
              <div className="h-20 w-[150%]">
                <img
                  src={img_2}
                  alt="Customer Satisfaction Survey"
                  className="h-[100px] w-[100px] object-cover"
                />
              </div>
              <div className="flex flex-col items-start justify-start gap-3">
                <div className="my-2 pr-3 text-2xl font-bold text-[#1D4ED8]">
                  Customer Satisfaction Survey
                </div>
                <p className="w-full text-start text-sm text-[#828282]">
                  Help us improve our services by providing your feedback
                  through this comprehensive customer satisfaction survey. This
                  survey is designed to gather your opinions on various aspects
                  of our service, including quality, efficiency, and overall
                  experience. It will take only a few minutes to complete, and
                  all your responses will be kept confidential. Your input is
                  incredibly valuable to us and will play a significant role in
                  shaping our future offerings and enhancements. We aim to
                  create the best possible experience for our customers, and
                  your feedback is the key to our continuous improvement.
                  Whether it’s praise, suggestions, or concerns, we want to hear
                  from you. Your participation will help us understand your
                  needs better and serve you more effectively. Thank you for
                  taking the time to share your thoughts with us.
                </p>
              </div>
            </div>
          </figure>

          {/* Favorite Programming Language Poll */}
          <figure className="flex w-full flex-row-reverse gap-28 rounded-xl bg-[#f9fafb] p-6">
            <div className="relative h-fit w-fit">
              <svg
                width="550"
                height="302"
                viewBox="0 0 550 302"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <pattern
                    id="imgPattern3"
                    patternUnits="userSpaceOnUse"
                    width="550"
                    height="302"
                  >
                    <image
                      href="https://miro.medium.com/v2/resize:fit:640/format:webp/1*k571AdZ8qSCegwR74oVWiQ.jpeg"
                      x="0"
                      y="0"
                      width="550"
                      height="302"
                      preserveAspectRatio="xMidYMid slice"
                    />
                  </pattern>
                </defs>
                <path
                  d="M1.98404 149.255L37.332 128.579C37.9453 128.22 38.3222 127.563 38.3222 126.853V3C38.3222 1.89543 39.2176 1 40.3222 1H547C548.105 1 549 1.89543 549 3V299C549 300.105 548.105 301 547 301H40.3222C39.2176 301 38.3222 300.105 38.3222 299V174.66C38.3222 173.943 37.9381 173.28 37.3155 172.924L2.00052 152.717C0.66559 151.953 0.65644 150.031 1.98404 149.255Z"
                  stroke="#207ABD"
                  strokeWidth="2"
                  fill="url(#imgPattern3)"
                />
              </svg>
            </div>
            <div className="flex w-fit gap-4">
              <div className="h-20 w-[150%]">
                <img
                  src={img_1}
                  alt="Favorite Programming Language Poll"
                  className="h-[100px] w-[100px] object-cover"
                />
              </div>
              <div className="flex flex-col items-start justify-start gap-3">
                <div className="my-2 pr-3 text-2xl font-bold text-[#1D4ED8]">
                  Favorite Programming Language Poll
                </div>
                <p className="w-full text-start text-sm text-[#828282]">
                  Vote for your favorite programming language in this quick and
                  exciting poll. Whether you're a fan of Python, JavaScript,
                  C++, Java, or another language, your vote is important! This
                  poll aims to gather insights into the preferences of our
                  tech-savvy community. It’s a great way to see which languages
                  are trending and popular among developers today. Cast your
                  vote and see the results in real-time, allowing you to compare
                  your preferences with those of others in the community. This
                  poll is not just about voting; it’s about sharing your passion
                  for programming and engaging with a community of like-minded
                  individuals. Feel free to discuss your favorite languages,
                  share tips, and learn from others. Your vote will contribute
                  to a larger discussion about programming trends and
                  preferences. Don’t miss the chance to have your voice heard!
                </p>
              </div>
            </div>
          </figure>

          {/* Community Feedback */}
          <figure className="flex w-full gap-28 rounded-xl bg-[#f9fafb] p-6">
            <div className="relative h-fit w-fit">
              <svg
                width="550"
                height="302"
                viewBox="0 0 550 302"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <pattern
                    id="imgPattern4"
                    patternUnits="userSpaceOnUse"
                    width="550"
                    height="302"
                  >
                    <image
                      href="https://cdn.prod.website-files.com/61ad20e5b695cc23050e9552/6643ebd90bdb806077aa46e7_Community%20Feedback%20(1)-p-800.png"
                      x="0"
                      y="0"
                      width="550"
                      height="302"
                      preserveAspectRatio="xMidYMid slice"
                    />
                  </pattern>
                </defs>
                <path
                  d="M548.016 149.255L512.668 128.579C512.055 128.22 511.678 127.563 511.678 126.853V3C511.678 1.89543 510.782 1 509.678 1H3C1.89545 1 1 1.89543 1 3V299C1 300.105 1.89545 301 3 301H509.678C510.782 301 511.678 300.105 511.678 299V174.66C511.678 173.943 512.062 173.28 512.685 172.924L547.999 152.717C549.334 151.953 549.344 150.031 548.016 149.255Z"
                  stroke="#207ABD"
                  strokeWidth="2"
                  fill="url(#imgPattern4)"
                />
              </svg>
            </div>
            <div className="flex w-fit gap-4">
              <div className="h-20 w-[150%]">
                <img
                  src={img_1}
                  alt="Community Feedback"
                  className="h-[100px] w-[100px] object-cover"
                />
              </div>
              <div className="flex flex-col items-start justify-start gap-3">
                <div className="my-2 pr-3 text-2xl font-bold text-[#1D4ED8]">
                  Community Feedback
                </div>
                <p className="w-full text-start text-sm text-[#828282]">
                  We value your feedback and would love to hear from you! This
                  section is dedicated to gathering your thoughts and
                  suggestions about our platform, services, and overall
                  experience. Your feedback is crucial for us to understand what
                  we are doing well and where we can improve. Whether you have
                  ideas for new features, suggestions for improvements, or
                  general comments, we are eager to listen. By sharing your
                  insights, you are helping us create a better experience for
                  everyone. We are committed to continuously enhancing our
                  offerings based on your feedback. This is your opportunity to
                  have a direct impact on the future direction of our services.
                  Your voice matters to us, and we appreciate you taking the
                  time to share your thoughts. Together, we can build a more
                  responsive and user-friendly platform. Thank you for being an
                  active part of our community!
                </p>
              </div>
            </div>
          </figure>
        </div>
      </section>
    </>
  );
};

export default Testimonial;
