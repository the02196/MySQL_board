"use client";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export default function Post() {
  const [posts, setPosts] = useState([]);
  const [totalCnt, setTotalCnt] = useState(0);
  const [page, setPage] = useState(1);

  //   const router = useRouter();
  //   console.log(router.query)

  useEffect(() => {
    const fetchData = async () => {
      if (!page) return;
      const res = await fetch(`/api/post?page=${page}`);
      const data = await res.json();
      setPosts(data.results);
      console.log(data.results);
      setTotalCnt(data.totalCnt);
      console.log(data);
    };
    fetchData();
  }, [page]);

  const startPage = Math.max(1, page - 2);
  console.log("startPage " + startPage);

  const lastPage = Math.ceil(totalCnt / 15);
  console.log("lastPage " + lastPage);

  const endPage = Math.min(lastPage, page + 3);
  console.log(startPage);

  return (
    <>
      <p className="w-full text-center bg-gray-700 text-white p-3">
        현재 페이지: {page}
      </p>
      <div className="w-full flex justify-between my-2">
        {page > 1 ? (
          <button
            onClick={() => {
              setPage(page - 1);
            }}
          >
            이전
          </button>
        ) : (
          <button></button>
        )}
        {Array(endPage - startPage + 1)
          .fill(null)
          .map((_ , i) => {
            return (
              <>
                <button
                  onClick={() => {
                    setPage(i + 1);
                  }}
                >
                  {i + 1}
                </button>
              </>
            );
          })}
        {page < lastPage && (
          <button
            onClick={() => {
              setPage(page + 1);
            }}
          >
            다음
          </button>
        )}
      </div>

      {posts &&
        posts.map((e, i) => {
          return (
            <React.Fragment key={i}>
              <div className="bg-slate-100 rounded-md text-black m-2 p-5 flex flex-col justify-center items-center">
                <p className="font-bold">가격 : {e.amount}</p>
                <p className="text-[12px]">결제일자 : {e.payment_date}</p>
              </div>
            </React.Fragment>
          );
        })}
    </>
  );
}
