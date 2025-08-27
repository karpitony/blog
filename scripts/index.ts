import generatePostAndDiaryList from './generate-post-list';
import generateProjectList from './generate-project-list';
import copyOnlyImages from './copy-assets';
import generateImageInfo from './generate-image-info';

async function main() {
  await Promise.all([
    generatePostAndDiaryList,
    generateProjectList,
    copyOnlyImages,
    generateImageInfo,
  ]);
}

export default main()
  .then(() => console.log('✅ 모든 작업 완료'))
  .catch(err => {
    console.error('❌ 작업 중 오류 발생:', err);
    process.exit(1);
  });
