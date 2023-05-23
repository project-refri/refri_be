rm -f ../api/apps/api/src/*.proto ../api/apps/api-bundled/src/*.proto
cp ./*.proto ../api/apps/api/src 
cp ./*.proto ../api/apps/api-bundled/src

rm -f ../image-process/protos/*.proto
cp ./*.proto ../image-process
