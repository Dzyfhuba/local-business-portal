import axios from "axios";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import Hosts from "../Config/Hosts";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/mousewheel";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import { supabase } from "../Config/SupabaseClient";
import Image404 from "../Images/404.jpg";
import { Mousewheel } from "swiper";

const PostsPreview = (props) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get(Hosts.main + "/post/few")
      .then(async (res) => {
        console.log(res.data.data);
        if (res.data.status === "success") {
          const mapped = await Promise.all(
            res.data.data.map(async (post) => {
              const images = post.images.split(",");
              const { data } = await supabase.storage
                .from("post-images")
                .getPublicUrl(
                  images[Math.floor(Math.random() * images.length)]
                );
              return {
                ...post,
                image: data.publicURL,
              };
            })
          );
          setPosts(mapped);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  console.log(posts);

  return (
    <div className={props.className} {...props}>
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        mousewheel={(true, { forceToAxis: true })}
        direction={"horizontal"}
        modules={[Mousewheel]}
        breakpoints={{
          "@0.00": {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          "@0.75": {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          "@1.00": {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          "@1.50": {
            slidesPerView: 4,
            spaceBetween: 50,
          },
        }}
      >
        {posts.length
          ? posts.map((post, index) => (
              <SwiperSlide
                className="h-80 shadow rounded my-3 overflow-y-hidden bg-white"
                key={index}
              >
                <Link to={`/post/${post.username}/${post.slug}`}>
                  <LazyLoadImage
                    src={post.image}
                    placeholder={<span>asdasd</span>}
                    placeholderSrc={Image404}
                    width="100%"
                    className={"items-center object-cover"}
                    wrapperClassName={"h-3/4 overflow-hidden flex"}
                  />
                </Link>
                <article className="p-3">
                  <h1 className="text-lg">
                    <Link
                      to={`/post/${post.username}`}
                      className="hover:underline"
                    >
                      {post.name}
                    </Link>
                  </h1>
                </article>
              </SwiperSlide>
            ))
          : null}
      </Swiper>
    </div>
  );
};

PostsPreview.propTypes = {
  className: PropTypes.string,
};

export default PostsPreview;
