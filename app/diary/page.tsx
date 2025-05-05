import { getDiaryList } from '@/libs/Diary/getDiaryList';
import DiaryList from '@/components/Diary/DiaryList';
import WongojiTitle from '@/components/Diary/WongojiTitle';

export const metadata = {
  title: 'Diary | 일기',
  description: '일기 목록 페이지입니다.',
  keywords: 'diary, list',
};



export default async function LatestDiaryPage() {
  const diaryList = await getDiaryList();
  return (
    <div className='mt-4 mb-24 text-black dark:text-gray-100'>
      <WongojiTitle text="나의 일기 목록" />
      <div className="py-4 mt-2 mb-12">
        <p>- 생각을 적거나 하루 회고를 씁니다.</p>
        <p>- 왜 일기를 전체공개로 쓰는지 저도 잘 모르겠습니다. 생존 확인용으로 써주세요.</p>
      </div>
      <DiaryList diaryList={diaryList} />
    </div>
  );
};
