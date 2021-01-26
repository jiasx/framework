const request = require('request');
const fs = require('fs');
const read = require('fs-readdir-recursive');
const program = require('commander');

const deployTargets = {
  test: {
    host: 'test.zybang.com',
  },
  test01: {
    host: '47.104.204.138',
  },
  test02: {
    host: '192.168.1.21',
  },
  test03: {
    host: '192.168.0.120',
  },
  test04: {
    host: '192.168.240.88',
  },
  test05: {
    host: '192.168.240.89',
  },
  test06: {
    host: '192.168.1.161',
  },
  test07: {
    host: '192.168.1.162',
  },
  test10: {
    host: '192.168.240.96',
  },
  test11: {
    host: '192.168.1.165',
  },
  test12: {
    host: '192.168.1.158',
  },
  test13: {
    host: '192.168.240.90',
  },
  test14: {
    host: '192.168.7.65',
  },
  test15: {
    host: '192.168.7.66',
  },
  test30: {
    host: '192.168.240.91',
  },
  test110: {
    host: '192.168.240.149',
  },
  test267: {
    host: '192.168.241.85',
  },
  pttest13: {
    host: '192.168.240.90',
  },
  qatest9: {
    host: '192.168.240.34',
  },
  qatest12: {
    host: '192.168.240.110',
  },
  qatest14: {
    host: '192.168.240.112',
  },
  qatest17: {
    host: '192.168.240.115',
  },
  qatest18: {
    host: '192.168.240.132',
  },
  qatest19: {
    host: '192.168.240.133',
  },
  qatest60: {
    host: '192.168.241.87',
  },
};

program
  .arguments('<cmd>')
  .action((cmd) => {
    const fileList = read('./dist');
    fileList.forEach((item) => {
      const file = item.replace(/\\/g, '/'); // 兼容 windows
      const formData = {
        to: `/home/homework/webroot/static/gateways/${file}`,
        file: {
          value: fs.createReadStream(`./dist/${file}`),
          options: {
            filename: '',
            contentType: '',
          },
        },
      };
      request.post({ url: `http://${deployTargets[cmd].host}:8020/fisreceiver.php`, formData }, (err, httpResponse, body) => {
        if (err) {
          return console.error('upload failed:', err);
        }
        //(`${file} 上传${body === 1 ? '失败' : '成功'}`);
        return true;
      });
    });
  });

program.parse(process.argv);
