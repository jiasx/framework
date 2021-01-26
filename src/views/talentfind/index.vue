<!--
 * @Author: jiashuangxi
 * @Date: 2019-11-11 19:27:19
 * @LastEditors: jiashuangxi
 * @LastEditTime: 2021-01-25 14:12:57
 * @Describe: 达人发现
-->
<template>
  <div class="talentfind page-scroll__set">
    <div class="talentfind-block tab-block" style="display:" v-if="talentfind">
      <el-form ref="talentform" :model="talentform">
        <el-input v-model="talentform.key_word" onkeyup="value=value.replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g,'')" class="talent-input" placeholder="请输入抖音名称、抖音id、简介或认证信息"
        @keyup.enter.native="entersearch" size="small" >
        <i slot="suffix" class="el-input__icon el-icon-search search-btn" 
        @click="handleClick"></i>
        </el-input>
        <el-form-item label="达人类别" :class="is_show ? 'new_detail' : 'talent_detail'">
          <transition>
          <p class="el-form-item__tit" @click="is_show=!is_show">
            {{wordtit}}
            <i class="header-icon el-icon-arrow-down"></i></p>
          </transition>   
          <el-checkbox-group v-model="talentform.checkeddrtype" size="mini" @change="selectData">
            <el-checkbox-button v-for="item in drtypeOptions" :key="item.id" :label="item.id">
              {{ item.name }}
            </el-checkbox-button>
          </el-checkbox-group>

        </el-form-item>
        <el-form-item label="易指数" >
          <el-radio-group v-model="talentform.easyrates" size="mini" @change="selectData">
            <el-radio-button v-for="item in yztypeOptions" :key="item.yznumber" 
            :label="{'min_easy_rate':item.min_easy_rate, 'max_easy_rate':item.max_easy_rate}">
              {{item.yznumber}}
            </el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="粉丝量" >
          <el-radio-group v-model="talentform.followercounts" size="mini" @change="selectData">
            <el-radio-button v-for="item in fstypeOptions" :key="item.fsnumber" 
            :label="{'min_follower_count':item.min_follower_count, 'max_follower_count':item.max_follower_count}">
              {{item.fsnumber}}
            </el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="点赞量" >
          <el-radio-group v-model="talentform.totalfavorited" size="mini" @change="selectData">
            <el-radio-button v-for="item in dztypeOptions" :key="item.dznumber" 
            :label="{'min_total_favorited':item.min_total_favorited, 'max_total_favorited':item.max_total_favorited}">
              {{item.dznumber}}
            </el-radio-button>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="高级筛选">
          <div class="tit-name">
          是否认证：
          <el-select v-model="talentform.selectlv" placeholder="请选择" size="mini" style="width: 86px" @change="selectData">
          <el-option 
            v-for="item in selectlvoptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
          </el-select>
          </div>

          <div class="tit-name">
          商品橱窗：
          <el-select v-model="talentform.selectzb" placeholder="请选择" size="mini" style="width: 86px"
          @change="selectData">
          <el-option 
            v-for="item in selectzboptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
          </el-select>
          </div>
        </el-form-item>
      </el-form>
      <!-- 筛选条件 -->
    </div>
  <!-- 数据列表 -->
  <div class="talentmain find-block">
  <el-table
      ref="table"
      v-loading="loading" 
      element-loading-text="数据正在加载中" 
      @sort-change="handleTableSort"
      :default-sort = "{prop: 'follower_count', order: 'descending'}"
      :height="tableHeight"
      :data="talentData"
      :header-cell-style="{color: '#666', fontWeight:'normal'}"
      style="width: 100%;"
      >
      <el-table-column
        label="达人"
        >
        <template slot-scope="scope">
          <div class="drset">
              <div class="head-list">
                  <div class="head-list__pic">
                    <img v-lazy="scope.row.avatar" :key="scope.row.avatar" class="head-list__pic-picsrc head-pic"/>
                  </div>
                    <div class="head-list__tit">
                      <div class="tanlent-block">
                        <span class="tx-pic" :title="scope.row.nickname">{{scope.row.nickname}}</span>
                        <!-- 直播 -->
                        <i class="video-cion set-com-cion set-video"></i>
                        <!-- 商品橱窗 -->
                        <i class="pro-cion set-com-cion" v-if="scope.row.with_commerce_entry"></i>
                      </div>
                      <span class="ty-tit">抖音号：{{scope.row.short_id === null ? '未知': scope.row.short_id }}</span>
                      <template v-if="scope.row.kol_category != null">
                            <el-tag class="el-tag-set" size="mini" v-for="label in scope.row.kol_category.split(',') " :key="label">{{label}}</el-tag>
                      </template>
                    </div>
                </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="粉丝总量"
        prop="follower_count"
        label-class-name=yzordertit
        :sort-orders="['descending']"
        sortable
        min-width="24%"
        align="center"
        >
        <template slot-scope="scope">
          <div class="taccount">
            <span class="taccount-one">{{scope.row.follower_count | numtransfor}}</span>&nbsp;
            <span v-if="scope.row.follower_count_grow >= 0" class="taccount-two upset">{{scope.row.follower_count_grow | numtransfor}}↑</span>
            <span v-else class="taccount-two downset">{{scope.row.follower_count_grow | numtransfor}}↓</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        min-width="24%"
        prop="total_favorited"
        label-class-name=yzordertit
        :sort-orders="['descending']"
        :sort-by="['total_favorited']"
        sortable
        label="点赞总量">
        <template slot-scope="scope">
          <div class="taccount">
            <span class="taccount-one">{{scope.row.total_favorited | numtransfor}}</span>&nbsp;
            <span v-if="scope.row.total_favorited_grow >= 0" class="taccount-two upset">{{scope.row.total_favorited_grow | numtransfor}}↑</span>
            <span v-else class="taccount-two downset">{{scope.row.total_favorited_grow | numtransfor}}↓</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        min-width="24%"
        label="点赞均量">
        <template slot-scope="scope">
          <span class="tit-nor" v-if="scope.row.avg_total_favorited == null">0</span>
          <span class="tit-nor" v-else>{{scope.row.avg_total_favorited | numtransfor}}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        min-width="24%"
        label="评论均量">
        <template slot-scope="scope">
          <span class="tit-nor" v-if="scope.row.avg_total_comment == null">0</span>
          <span class="tit-nor" v-else>{{scope.row.avg_total_comment | numtransfor}}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        min-width="24%"
        label="分享均量">
        <template slot-scope="scope">
          <span class="tit-nor" v-if="scope.row.avg_total_share == null">0</span>
          <span class="tit-nor" v-else>{{scope.row.avg_total_share | numtransfor}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="easy_rate"
        align="center"
        min-width="24%"
        label-class-name=yzordertit
        sortable
        :sort-orders="['descending']"
        :sort-by="['easy_rate']"
        label="易指数">
        <template slot-scope="scope">
          <span class="tit-font" v-if="scope.row.easy_rate == null">0</span>
          <span class="tit-font" v-else>{{scope.row.easy_rate | yznumtransfor}}</span>
        </template>
      </el-table-column>
      <el-table-column
      fixed="right"
      align="center"
      min-width="14%"
      label="操作"
      >
      <template slot-scope="scope">
        <el-dropdown @command="handleDropDownClick">
          <el-button type="text" size="mini" class="moreBtn">···</el-button>
          <el-dropdown-menu class="dropdown-set" slot="dropdown" size="mini">
            <el-dropdown-item :command="{method: 'lookdetail', args: [scope.row]}">
              <i class="dt-cion tip-set"></i>查看详情
            </el-dropdown-item>

            <el-dropdown-item :command="{method: 'showNormalDialog', args:[scope.row, 'okclt']}"
            v-if="scope.row.is_collected === 0">
              <i class="clt-nor tip-set"></i>收藏达人
            </el-dropdown-item>
            
            <el-dropdown-item :command="{method: 'showNormalDialog', args:[scope.row, 'chanelclt']}"
            v-else>
              <i class="clt-act tip-set"></i>取消收藏
            </el-dropdown-item>

            <el-dropdown-item v-if="scope.row" style="cursor: not-allowed;">
              <i class="cpare-nor tip-set"></i>达人对比
            </el-dropdown-item>
            <el-dropdown-item v-else>
              <i class="cpare-act tip-set"></i>取消对比
            </el-dropdown-item>

          </el-dropdown-menu>
        </el-dropdown>
      </template>
    </el-table-column>
    </el-table>
  </div>
    <el-dialog
      title="提示"
      :visible.sync="normalDialog.visible"
      width="500px"
      >
      <div>{{ normalDialog.content }}</div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="normalDialog.visible = false" size="mini">取消</el-button>
        <el-button type="primary" @click="normalDialog.handleClose" size="mini">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { gettalentfindList } from '@/api/locowerApi';

export default {
  name: 'talentfind',
  data() {
    return {
      // 监听屏幕操作-初始化设置
      tableHeight: (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight) - 380,
      talentfind: true,
      // 展开收缩
      is_show: true,
      // 加载
      loading: false,
      // 达人发现数据
      talentData: [],
      // 弹出框
      normalDialog: {
        visible: false,
        content: '',
        handleClose: () => {},
      },
      // 区分是通过参数请求，还是无参数请求
      isHaveParams: false,
      // 分页 
      hasmore: 1, // 是否有分页 0没有，1有
      limit: 10, // 每页条数
      page: 1, // 当前页
      talentform: {
        // 输入框内容
        key_word: '',
        // 达人类别
        checkeddrtype: [],
        // 易指数
        easyrates: [],
        // 粉丝量
        followercounts: [],
        // 点赞量
        totalfavorited: [],
        // 高级筛选
        // 是否认证
        selectlv: '',
        // 商品橱窗
        selectzb: '',
      },
      // 达人类别
      drtypeOptions: [
        { id: '1', name: '美女' },
        { id: '2', name: '帅哥' },
        { id: '3', name: '生活' },
        { id: '4', name: '娱乐' },
        { id: '5', name: '剧情' },
        { id: '6', name: '搞笑' },
        { id: '7', name: '旅行' },
        { id: '8', name: '动物' },
        { id: '9', name: '美食' },
        { id: '10', name: '时尚' },
        { id: '11', name: '美妆' },
        { id: '12', name: '穿搭' },
        { id: '13', name: '明星' },
        { id: '14', name: '舞蹈' },
        { id: '15', name: '游戏' },
        { id: '16', name: '科技' },
        { id: '17', name: '动漫' },
        { id: '18', name: '影视' },
        { id: '19', name: '音乐' },
        { id: '20', name: '母婴' },
        { id: '21', name: '运动' },
        { id: '22', name: '情感' },
        { id: '23', name: '教育' },
        { id: '24', name: '汽车' },
        { id: '25', name: '知识' },
        { id: '26', name: '时政' },
        { id: '27', name: '职场' },
        { id: '28', name: '创意' },
        { id: '29', name: '健康' },
        { id: '30', name: '种草' },
        { id: '31', name: '其他' },
      ],
      // 易指数
      yztypeOptions: [
        { yznumber: '0 ~ 50', min_easy_rate: '0', max_easy_rate: '5000' },
        { yznumber: '50 ~ 70', min_easy_rate: '5000', max_easy_rate: '7000' },
        { yznumber: '70 ~ 80', min_easy_rate: '7000', max_easy_rate: '8000' },
        { yznumber: '80 ~ 90', min_easy_rate: '8000', max_easy_rate: '9000' },
        { yznumber: '90 ~ 95', min_easy_rate: '9000', max_easy_rate: '9500' },
        { yznumber: '95 ~ 100', min_easy_rate: '9500', max_easy_rate: '10000' },
      ],
      // 粉丝量
      fstypeOptions: [
        { fsnumber: '10w ~ 50w', min_follower_count: '100000', max_follower_count: '500000' },
        { fsnumber: '50w ~ 100w', min_follower_count: '500000', max_follower_count: '1000000' },
        { fsnumber: '100w ~ 300w', min_follower_count: '1000000', max_follower_count: '3000000' },
        { fsnumber: '300w ~ 500w', min_follower_count: '3000000', max_follower_count: '5000000' },
        { fsnumber: '1000w以上', min_follower_count: '10000000' },
      ],
      // 点赞量
      dztypeOptions: [
        { dznumber: '100w以下', min_total_favorited: '0', max_total_favorited: '1000000' },
        { dznumber: '100w ~ 500w', min_total_favorited: '1000000', max_total_favorited: '5000000' },
        { dznumber: '500w ~ 1000w', min_total_favorited: '5000000', max_total_favorited: '10000000' },
        { dznumber: '1000w ~ 3000w', min_total_favorited: '10000000', max_total_favorited: '30000000' },
        { dznumber: '3000w ~ 5000w', min_total_favorited: '30000000', max_total_favorited: '50000000' },
        { dznumber: '5000w ~ 10000w', min_total_favorited: '50000000', max_total_favorited: '100000000' },
        { dznumber: '10000w以上', min_total_favorited: '100000000' },
      ],
      // 是否认证
      selectlvoptions: [
        {
          value: '',
          label: '全部',
        }, {
          value: '1',
          label: '是',
        },
        {
          value: '0',
          label: '否',
        },
      ],
      // 商品橱窗
      selectzboptions: [
        {
          value: '',
          label: '全部',
        }, {
          value: '1',
          label: '有',
        },
        {
          value: '0',
          label: '无',
        },
      ],

    };
  },
  computed: {
    wordtit() {
      if (this.is_show === false) {
        return '收起';
      } else if (this.is_show === true) {
        const that = this;
        that.tableHeight = (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight) - 320;
        return '展开';
      }
    },
  },
  watch: {
    // 监听屏幕操作-性能处理
    tableHeight(val) {
      if (!this.timer) {
        this.tableHeight = val;
        this.timer = true;
        const that = this;
        setTimeout(() => {
          that.timer = false;
        }, 400);
      }
    },
  },
  mounted() {
    // 监听table 滚动条
    this.tableBodyDom = this.$refs.table.bodyWrapper;
    this.tableBodyDom.addEventListener('scroll', (res) => {
      const height = res.target;
      // 整体数据的高度 796  721  75
      const sHeight = height.scrollHeight;
      // 可视区域的大小
      const cHeight = height.clientHeight;
     
      // 滚动条高度
      const sTop = height.scrollTop;
      if (sTop + cHeight >= sHeight) {
        ++this.page;
        this.getTalentfind();
      }
      // 滚动条高度大于850
      if (sTop > 850) {
        setTimeout(() => {
          this.talentfind = false;
        }, 10);
        const that = this;
        that.tableHeight = (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight);
      } else {
        this.talentfind = true;
      }
      
    });
    // 监听屏幕操作-屏幕变化
    const that = this;
    window.onresize = () => (() => {
      window.tableHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
      that.tableHeight = window.tableHeight;
    })();
  },
  // 销毁
  beforeDestroy() {
    this.$refs.table.bodyWrapper.removeEventListener('scroll', {}, true);
  },
  created() {
    // 达人发现列表
    this.getTalentfind();
  },
  methods: {
    handleDropDownClick(command) {
      if (command.args.length > 0) {
        this[command.method](...command.args);
      } else {
        this[command.method]();
      }
    },
    // 排序
    handleTableSort(val) {
      this.getTalentfind(val);
    },
    // 查看详情
    lookdetail(row) {
      this.$router.push({
        path: '/homesage',
        query: {
          uid: row.uid,
          nickname: row.nickname,
          avatar: row.avatar,
          short_id: row.short_id,
        },
      });
    },
    // 收藏达人、取消收藏
    showNormalDialog(data, action) {
      const { uid } = data;
      const actionMap = {
        okclt: {
          text: '收藏达人',
          url: '/collect/collect_kol',
        },
        chanelclt: {
          text: '取消收藏',
          url: '/collect/uncollect_kol',
        },
      };
      this.normalDialog = {
        visible: true,
        content: `确认要${actionMap[action].text}这条消息吗？`,
        handleClose: () => {
          this
            .$fetch({
              method: 'post',
              url: actionMap[action].url,
              data: { uid },
            })
            .then((res) => {
              if (res.code === 200) {
                this.normalDialog.visible = false;
                this.getTalentfind();
                return;
              }
              this.$message.error(res.errstr);
            })
            .catch((err) => {
              throw err;
            });
        },
      };
    },
    // 键盘enter事件
    entersearch() {
      this.handSearch();
    },
    // 搜索事件
    handleClick() {
      this.handSearch();
    },
    // 搜索事件
    handSearch() {
      if (this.talentform.key_word.length === 1) {
        this.$message.warning('请输入大于1个字符以上的中文、英文或数字进行检索');
        return;
      }
      if (this.talentform.key_word === '') {
        this.tableBodyDom.scrollTo(0, 0);
        this.talentData = [];
        this.page = 1;
        this.getTalentfind();
        return;
      }
      this.tableBodyDom.scrollTo(0, 0);
      if (!this.isHaveParams) {
        this.talentData = [];
        this.page = 1;
      } else {
        this.talentData = [];
        this.page = 1;
      }
      this.getTalentfind();
    },
    
    selectData() {
      this.tableBodyDom.scrollTo(0, 0);
      this.getTalentfind();
    },
    // 接口调用
    getTalentfind(arr) {
      this.loading = true;
      const params = {
        page: this.page,
      };
      // 排序
      if (arr !== undefined) {
        if (arr.prop === 'total_favorited') {
          params.orderBy = 1;
        }
        if (arr.prop === 'easy_rate') {
          params.orderBy = 2;
        }
      }
      
      if (this.talentform.key_word !== '') {
        params.key_word = this.talentform.key_word;
      }
      // 达人类别处理
      const ckedtype = this.talentform.checkeddrtype;
      const checkeddrtype = ckedtype.join(',');
      if (checkeddrtype !== '') {
        params.category_id = checkeddrtype;
      }
      // 易指数处理
      const rdtype = this.talentform.easyrates;
      /* eslint-disable  */
      const mineasyrate = rdtype.min_easy_rate;
      const maxeasyrate = rdtype.max_easy_rate;
      if(mineasyrate !== undefined) {
        params.min_easy_rate = mineasyrate;
      }
      if(maxeasyrate !== undefined) {
        params.max_easy_rate = maxeasyrate;
      }
      // 粉丝量处理
      const fstype = this.talentform.followercounts;
      const minfollowercount = fstype.min_follower_count;
      const maxfollowercount = fstype.max_follower_count;
      if(minfollowercount !== undefined) {
        params.min_follower_count = minfollowercount;
      }
      if(maxfollowercount !== undefined) {
        params.max_follower_count = maxfollowercount;
      }
      // 点赞量处理
      const dztype = this.talentform.totalfavorited;
      const mintotalfavorited = dztype.min_total_favorited;
      const maxtotalfavorited = dztype.max_total_favorited;
      if(mintotalfavorited !== undefined) {
        params.min_total_favorited = mintotalfavorited;
      }
      if(maxtotalfavorited !== undefined) {
        params.max_total_favorited = maxtotalfavorited;
      }
      // 是否认证
      const selectlv = this.talentform.selectlv;
      if(selectlv !== '') {
        params.is_verify = selectlv;
      }
      // 商品橱窗
      const selectzb = this.talentform.selectzb;
      if(selectzb !== '') {
        params.with_commerce_entry = selectzb;
      }
     
      gettalentfindList(params).then((res) => {
        if (res.code === 200) {
          if (this.talentform.key_word) {
            this.isHaveParams = true;
          } else {
            this.isHaveParams = false;
          }
          // 数据处理
          if (this.page === 1) {
            this.talentData = res.data.kol_list;
          } else {
            this.talentData = [...this.talentData, ...res.data.kol_list];
            // 更多处理
            if(res.data.pagination.has_more === 0) {
              this.$message('已经到底，没有更多了');
              this.loading = false;
              return false;
            }
          }
          this.loading = false;
        }
      });
    },
  },
};
</script>
<style lang="scss">
// 易指数
.yzordertit {
  color: #4F8DFB;
}
</style>

<style lang="scss" scoped>
@import 'common/css/common.scss';
</style>
