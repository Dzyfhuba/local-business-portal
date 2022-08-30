import React from "react";
import PropTypes from "prop-types";
import Main from "../../Layouts/Main";
import Welcome from "../../Containers/Welcome";
import About from "../../Containers/About";
import { Helmet } from "react-helmet-async";
import Var from "../../Config/Var";
import StallsPreview from "../../Containers/StallsPreview";
import ButtonAnchor from "../../Components/ButtonAnchor";
import { HiOutlineChevronDoubleRight } from "react-icons/hi";
import PostsPreview from "../../Containers/PostsPreview";

const Home = () => {
  return (
    <Main id="container">
      <Helmet>
        <title>{`${Var.APP_NAME}`}</title>
        <meta
          name="description"
          content="Portal UMKM Desa Bululanjang Sangkapura Bawean adalah sebuah aplikasi website yang menampung sejumlah informasi-informasi tentang UMKM di desa Bululanjang untuk mempromosikannya ke internet dengan lebih luas dan membawa nama Bululanjang sebagai pusat bisnisnya."
        />
      </Helmet>
      <div className="-mt-14">
        <Welcome />
        <About />
        <div className={`min-h-screen bg-fixed relative z-0`} style={{ backgroundImage: "url('/bululanjang-mountain.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <section id="stalls-preview" className="mx-5">
            <div className="block sm:flex justify-between text-white">
              <h1 className="text-xl font-bold">
                Kilas Singkat UMKM Desa Bululanjang
              </h1>
              <ButtonAnchor
                to={"/stall"}
                className="hover:opacity-50 whitespace-nowrap w-fit ml-auto"
              >
                Lebih Banyak <HiOutlineChevronDoubleRight className="inline" />
              </ButtonAnchor>
            </div>
            <StallsPreview />
          </section>
          <section id="posts-preview" className="mx-5">
            <div className="block sm:flex justify-between text-white">
              <h1 className="text-xl font-bold">
                Kilas Singkat Produk Desa Bululanjang
              </h1>
              <ButtonAnchor
                to={"/post"}
                className="hover:opacity-50 whitespace-nowrap w-fit ml-auto"
              >
                Lebih Banyak <HiOutlineChevronDoubleRight className="inline" />
              </ButtonAnchor>
            </div>
            <PostsPreview />
          </section>
        </div>
      </div>
    </Main>
  );
};

Home.propTypes = {
  auth: PropTypes.any,
};

export default Home;
