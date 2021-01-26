#!/bin/bash
MOD_NAME="waiter__manage"
TAR="$MOD_NAME.tar.gz"

username=`whoami`
source /home/${username}/.bash_profile

rm -rf output
rm -rf ./webroot/static
npm install --registry http://fe.suanshubang.com/npm//

#创建打包目录
mkdir -p ./webroot/static/${MOD_NAME}

# if [ $1 ] ; then
# #生成环境构建，并且将静态资源发送到BOS的CDN中
# npm run upload:bos
# #将目录中非目录文件传到打包目录中
# mv -f dist/*.* ./webroot/static/${MOD_NAME}
# else
npm run build
mv -f dist/* ./webroot/static/${MOD_NAME}
# fi
#移除构建目录
rm -rf dist

#打包
tar zcf $TAR ./webroot/*

mkdir output

mv $TAR output/

echo "build end"
