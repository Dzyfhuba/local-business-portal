import { useEffect, useState } from "react";
// import PropTypes from 'prop-types'
import axios from "axios";
import { Helmet } from "react-helmet-async";
import { FaWhatsapp } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import PhoneInput from "react-phone-number-input";
import { Link, useParams } from "react-router-dom";
import { Mousewheel, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import Button from "../../Components/Button";
import Hosts from "../../Config/Hosts";
import { supabase } from "../../Config/SupabaseClient";
import Var from "../../Config/Var";
import Image404 from "../../Images/404.jpg";
import Main from "../../Layouts/Main";

const Item = (props) => {
  const { stall } = useParams();
  const [item, setItem] = useState({});
  const [posts, setPosts] = useState([]);
  const [expand, setExpand] = useState(false);

  useEffect(() => {
    axios.get(`${Hosts.main}/stall/${stall}`).then(async (res) => {
      const { data } = await supabase.storage
        .from("profile")
        .getPublicUrl(res.data.data.stall.profile);
      res.data.data.stall.profile = data.publicURL;

      setItem(res.data.data.stall);

      res.data.data.posts = await Promise.all(
        res.data.data.posts.map(async (post) => {
          let image =
            post.images.split(",")[
              Math.floor(Math.random() * 100) %
                (post.images.split(",").length - 1)
            ] ||
            post.images ||
            "/404.jpg";

          if (image !== "/404.jpg") {
            const { data } = await supabase.storage
              .from("post-images")
              .getPublicUrl(image);
            image = data.publicURL || "/404.jpg";
          }
          return {
            ...post,
            image,
          };
        })
      );

      console.log(res.data.data.posts);

      setPosts(res.data.data.posts);
    });
  }, [setItem, stall]);

  return (
    <Main>
      <Helmet>
        <title>{`${item.name} | UMKM | ${Var.APP_NAME}`}</title>
        <meta
          name="description"
          content="Portal UMKM Desa Bululanjang Sangkapura Bawean adalah sebuah aplikasi website yang menampung sejumlah informasi-informasi tentang UMKM di desa Bululanjang untuk mempromosikannya ke internet dengan lebih luas dan membawa nama Bululanjang sebagai pusat bisnisnya."
        />
      </Helmet>
      <div id="container" className="mt-3">
        <article id="stall-profile" className="mx-5 mb-3">
          <div className="text-center ">
            <Zoom>
              <LazyLoadImage
                src={item.profile}
                placeholder={<span>asdasd</span>}
                placeholderSrc={Image404}
                className={"h-80 object-contain text-center"}
                // wrapperClassName={'aspect-square'}
              />
            </Zoom>
          </div>
          <div id="header" className="p-3 bg-white mb-3 shadow-md">
            <h1 id="title" className="text-3xl font-bold">
              {item.name}
            </h1>
            <small>{item.address}</small>
            <div className="flex items-center justify-between h-14 border overflow-x-scroll sm:overflow-hidden">
              <PhoneInput
                defaultCountry={"ID"}
                placeholder="Nomor Telepon..."
                value={item.phone}
                className="focus-within:outline-secondary outline p-3 bg-white outline-none border-none"
                onChange={() => console.log("")}
                readOnly
                disabled
              />
              <a
                className="aspect-square h-11 text-center bg-[#47C753] text-white rounded shadow-md p-3"
                href={`https://api.whatsapp.com/send?phone=${
                  item.phone ? item.phone.replace("+", "") : null
                }`}
                rel="noopener noreferrer"
                target={"_blank"}
              >
                <FaWhatsapp className="mx-auto text-lg" />
              </a>
            </div>
          </div>
          <div id="description" className="bg-white p-3 shadow-md">
            <h2 className="text-xl font-semibold">Deskripsi</h2>
            {(
              <>
                <p className={`${expand ? "" : "line-clamp-3 "}`}>
                  {item.description}
                </p>
                <Button
                  className="mx-auto block shadow rounded-full hover:font-bold hover:shadow-xl"
                  onClick={() => setExpand(!expand)}
                >
                  {expand ? "Persempit" : "Perluas"}{" "}
                  <MdKeyboardArrowDown
                    className={`inline text-2xl${
                      expand ? " -rotate-180 " : ""
                    }transition duration-300`}
                  />
                </Button>
              </>
            ) || (
              <div
                id="empty-description"
                className="border-dashed border-4 p-3 leading-10 text-center text-neutral-500"
              >
                Tidak ada deskripsi dari UMKM ini
              </div>
            )}
          </div>
        </article>
        <section
          id="posts"
          className="p-3 bg-white shadow-md overflow-hidden mx-5"
        >
          <h1 className="text-xl font-semibold mb-3">
            Produk Terkait UMKM Ini
          </h1>
          <Swiper
            id="post-list"
            slidesPerView={3}
            spaceBetween={10}
            mousewheel={(true, {forceToAxis: true})}
            modules={[Pagination, Mousewheel]}
            className={""}
          >
            {posts.length ? (
              posts.map((post) => (
                <SwiperSlide
                  className="h-44 shadow-md rounded border"
                  key={post.id}
                >
                  <Link to={`/post/${item.username}/${post.slug}`}>
                    <LazyLoadImage
                      src={post.image}
                      placeholder={<span>asdasd</span>}
                      placeholderSrc={Image404}
                      className={"items-center w-full object-cover"}
                  wrapperClassName={'h-3/4 w-full overflow-hidden flex'}
                      alt={post.title}
                    />
                  </Link>
                  <div className="px-3">
                    <h1 className="font-bold text-xl underline hover:text-blue-500">
                      <Link to={`/post/${item.username}/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h1>
                  </div>
                </SwiperSlide>
              ))
            ) : (
              <p>Tidak Ada Produk Yang Dipublikasikan</p>
            )}
          </Swiper>
        </section>
      </div>
    </Main>
  );
};

Item.propTypes = {};

export default Item;
