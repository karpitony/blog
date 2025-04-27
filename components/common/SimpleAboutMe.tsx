import Image from "next/image"
import cn from '@yeahx4/cn';

export default function SimpleAboutMe() {
  return (
    <div className="w-full flex flex-row justify-center md:justify-between items-center mt-2 md:mt-4">
      <div className="w-full flex flex-col">
        {/* 제목 및 모바일 프사 */}
        <div className="w-full flex flex-row justify-betweem items-center my-4">
          <div className={cn(
            "flex flex-1 flex-wrap flex-col text-2xl sm:text-3xl md:text-4xl", 
            "font-bold"
          )}>
            <h1>안녕하세요!</h1>
            <h1 className="md:mt-2">
              개발자, <span className="highlight-blue">송윤석</span>입니다.
            </h1>
          </div>
          <div className="flex justify-end flex-shrink-0 ml-2">
            <Image
              src="/profile.jpg"
              alt="프로필 사진"
              width={150}
              height={150}
              className="rounded-lg w-32 h-32 object-cover block sm:hidden"
            />
          </div>
        </div>

        <div className="text-base">
          <p>• <span className="font-bold highlight-blue">웹 프론트엔드</span>와 <span className="font-bold highlight-blue">응용 프로그램</span> 개발에 흥미가 있는 대학생입니다.</p>
          <p>• 프론트엔드, 공부한 것, 회고 등을 주로 업로드 할 계획입니다!</p>
        </div>
      </div>

      {/* 프로필 사진 */}
      <Image
        src="/profile.jpg"
        alt="프로필 사진"
        width={150}
        height={150}
        className="rounded-full w-48 h-48 object-cover hidden sm:flex"
      />
    </div>
  )
}