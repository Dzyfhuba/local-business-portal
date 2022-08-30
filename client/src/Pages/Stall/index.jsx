import useLocalStorage from "@rehooks/local-storage";
import axios from "axios";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { IoMdCloseCircle } from "react-icons/io";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import Button from "../../Components/Button";
import Input from "../../Components/Input";
import { ScrollToTop } from "../../Components/ScrollToTop";
import Hosts from "../../Config/Hosts";
import { supabase } from "../../Config/SupabaseClient";
import Var from "../../Config/Var";
import Image404 from "../../Images/404.jpg";
import Main from "../../Layouts/Main";

const Home = (props) => {
  const [stalls, setStalls] = useLocalStorage("stalls");
  const [filter, setFilter] = useState(Object);
  const [showClear, setShowClear] = useState(Boolean);

  useEffect(() => {
    axios.get(Hosts.main + "/stall").then((res) => {
      console.log(res.data.data);
      if (res.data.status === "success") {
        res.data.data.forEach(async (item, i) => {
          if (!item.profile) {
            res.data.data[i].profile = null;
            return;
          }
          const imageName = item.profile.split(";")[0];
          const { data } = await supabase.storage
            .from("profile")
            .getPublicUrl(imageName);
          // imageMap.push(data.publicURL)
          res.data.data[i].profile = data.publicURL;
        });
        setStalls(res.data.data);
      }
    });
  }, [setStalls]);
  // console.log(stalls);

  const searchStall = (e) => {
    e.preventDefault();
    const data = {
      filter: e.target.value,
    };
    console.log(data);
    setFilter(data);

    setShowClear(data.filter ? true : false);
  };

  return (
    <Main>
      <Helmet>
        <title>{`UMKM | ${Var.APP_NAME}`}</title>
        <meta
          name="description"
          content="Portal UMKM Desa Bululanjang Sangkapura Bawean adalah sebuah aplikasi website yang menampung sejumlah informasi-informasi tentang UMKM di desa Bululanjang untuk mempromosikannya ke internet dengan lebih luas dan membawa nama Bululanjang sebagai pusat bisnisnya."
        />
      </Helmet>
      <div className="mx-5 my-3">
        <div className="input-group flex items-center bg-white outline outline-1 outline-slate-200 rounded h-11 relative">
          <Input
            placeholder="Search..."
            className="outline-none absolute h-inherit mb-0"
            id="filter"
            onKeyUp={searchStall}
          />
          <Button
            className={`aspect-square h-full block z-[1] ml-auto px-0 py-0${
              showClear ? null : " hidden"
            }`}
            onClick={(e) => {
              e.preventDefault();
              setFilter("");
              document.getElementById("filter").value = "";
            }}
          >
            <IoMdCloseCircle className="text-2xl mx-auto text-neutral-300" />
          </Button>
        </div>
        <small className="text-xs opacity-50">
          Isi dengan nama UMKM atau alamatnya
        </small>
      </div>
      <div
        id="container"
        className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 place-content-center gap-3 mx-5"
      >
        {stalls
          ? stalls
              .filter((stall) => {
                if (filter.filter) {
                  return (
                    stall.username
                      .toLowerCase()
                      .includes(filter.filter.toLowerCase()) ||
                    stall.address
                      .toLowerCase()
                      .includes(filter.filter.toLowerCase()) ||
                    stall.name
                      .toLowerCase()
                      .includes(filter.filter.toLowerCase())
                  );
                }
                return stall;
              })
              .map((stall, i) => (
                <div
                  id="card"
                  key={stall.id}
                  className={`bg-white p-1 rounded shadow-md${
                    !stall.profile ? " order-last" : ""
                  }`}
                >
                  <Link to={`/stall/${stall.username}`}>
                    <LazyLoadImage
                      src={stall.profile}
                      placeholder={<span>asdasd</span>}
                      placeholderSrc={Image404}
                      width="100%"
                      className={"h-24 object-cover"}
                    />
                  </Link>
                  <div id="card-body" className="grid grid-cols-1 gap-1">
                    <h1 className="font-semibold">
                      <Link to={`/stall/${stall.username}`}>{stall.name}</Link>
                    </h1>
                    <h5 className="text-xs self-end">{stall.address}</h5>
                    <small className="text-end self-end">
                      {stall.updated_at}
                    </small>
                  </div>
                </div>
              ))
          : null}
      </div>
      <ScrollToTop />
    </Main>
  );
};

Home.propTypes = {
  auth: PropTypes.any,
};

export default Home;
