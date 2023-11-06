import db from "@/db";
import { NextRequest, NextResponse } from "next/server";
import { RowDataPacket } from "mysql2/promise";

export const GET = async (
  req: NextRequest,
  res: NextResponse
): Promise<NextResponse> => {
    if (req.method === "GET") {
        const page = Number(req.nextUrl.searchParams.get("page") || 1);
        const perPage = 15;
        const offset = (page - 1) * perPage;
        // 위 console.log() 작성 후 
        // http://localhost:3000/api/post/?page=1 를 postman에서 send 하면, 
        // 서버 터미널에 1 이라고 뜬다.
        try {
          const [results] = await db.query<RowDataPacket[]>("SELECT * FROM sakila.payment order by payment_date limit ? offset ?", [perPage, offset]);
        //   offset은 얼마나 건너 뛸지를 결정할 때, 사용한다.
        //   매개변수를 입력할 때, ?를 넣어 placeholder 해준다.
        //   저 ?를 넣는 문법은 mysql2 에서 사용한다.
    
          const [countResult] = await db.query<RowDataPacket[]>('select count(*) as cnt from sakila.payment');

          const totalCnt = countResult[0].cnt;
          return NextResponse.json({ message: "성공", results, totalCnt, page, perPage });
        } catch (error) {
          return NextResponse.json({ error: error });
        }
      }
    
      return NextResponse.json({ error: "에러가 발생하였습니다." });
};
