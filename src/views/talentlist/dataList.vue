<!--
 * @Author: jiashuangxi
 * @Date: 2020-12-14 10:13:53
 * @LastEditors: jiashuangxi
 * @LastEditTime: 2021-01-25 11:37:00
 * @Describe: 数据榜
-->
<template>
  <div class="talentfind">
    <div class="talentfind-block tab-block">
       <el-form ref="talentform" :model="talentform">
        <el-form-item label="达人类别" :class="is_show ? 'new_detail' : 'talent_detail'">
          <transition>
          <p class="el-form-item__tit" @click="is_show=!is_show">
            {{wordtit}}
            <i class="header-icon el-icon-arrow-down"></i></p>
          </transition>
          <el-radio-group v-model="talentform.checkeddrtype" size="mini" @change="selectData">
            <el-radio-button v-for="item in drtypeOptions" :key="item.id" :label="item.id">
              {{ item.name }}
            </el-radio-button>
          </el-radio-group>
        </el-form-item>

        <el-form-item class="cont-set">
              <el-select v-model="talentform.selectTm" class="cont-set_select" placeholder="请选择" size="mini"
              @change="selectChanged"
               >
              <el-option 
                v-for="item in selectTmoptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
              </el-select>
          <el-date-picker style="width: 300px" 
            size="mini"
            disabled
            v-model="date"
            type="daterange"
            range-separator="至"
            :default-time="['00:00:00', '00:00:00']"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
            <span class="ctvideo-intro">数据更新于 {{cycleData.updated_date}} 00:00:00 |   每日更新</span>
        </el-form-item>
      
      </el-form>
    </div>
      <!-- 数据列表 -->
  <div class="talentmain find-block">
  <el-table
      ref="table"
      v-loading="loading" 
      @sort-change="handleTableSort"
      element-loading-text="数据正在加载中" 
      :default-sort = "{prop: 'follower', order: 'descending'}"
      :height="tableHeight"
      :data="talentData"
      :header-cell-style="{color: '#666', fontWeight:'normal'}"
      style="width: 100%"
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
                      <span class="ty-tit">抖音号：{{scope.row.short_id}}</span>
                      <template v-if="scope.row.kol_category != null">
                            <el-tag class="el-tag-set" size="mini" v-for="label in scope.row.kol_category.split(',') " :key="label">{{label}}</el-tag>
                      </template>
                    </div>
                </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="follower"
        label-class-name=yzordertit
        :sort-orders="['descending']"
        sortable
        min-width="24%"
        label="粉丝总量"
        >
        <template slot-scope="scope">
          <div class="taccount">
            <span class="taccount-one">{{scope.row.follower | numtransfor}}</span>&nbsp;
            <span v-if="scope.row.follower_grow >= 0" class="taccount-two upset">{{scope.row.follower_grow | numtransfor}}↑</span>
            <span v-else class="taccount-two downset">{{scope.row.follower_grow | numtransfor}}↓</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="favorited"
        label-class-name=yzordertit
        :sort-orders="['descending']"
        :sort-by="['favorited']"
        sortable
        min-width="24%"
        label="点赞总量">
        <template slot-scope="scope">
          <div class="taccount">
            <span class="taccount-one">{{scope.row.favorited | numtransfor}}</span>&nbsp;
            <span v-if="scope.row.favorited_grow >= 0" class="taccount-two upset">{{scope.row.favorited_grow | numtransfor}}↑</span>
            <span v-else class="taccount-two downset">{{scope.row.favorited_grow | numtransfor}}↓</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        min-width="24%"
        label="点赞均量">
        <template slot-scope="scope">
          <span class="tit-nor" v-if="scope.row.avg_favorited == null">0</span>
          <span class="tit-nor" v-else>{{scope.row.avg_favorited | numtransfor}}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        min-width="24%"
        label="评论均量">
        <template slot-scope="scope">
          <span class="tit-nor" v-if="scope.row.avg_comment == null">0</span>
          <span class="tit-nor" v-else>{{scope.row.avg_comment | numtransfor}}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        min-width="24%"
        label="分享均量">
        <template slot-scope="scope">
          <span class="tit-nor" v-if="scope.row.avg_share == null">0</span>
          <span class="tit-nor" v-else>{{scope.row.avg_share | numtransfor}}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="easy_rate"
        label-class-name=yzordertit
        sortable
        :sort-by="['easy_rate']"
        :sort-orders="['descending']"
        min-width="24%"
        label="易指数">
         <template slot-scope="scope">
          <span class="tit-font" v-if="scope.row.easy_rate == null">0</span>
          <span class="tit-font" v-else>{{scope.row.easy_rate | yznumtransfor}}</span>
        </template>
      </el-table-column>
      <el-table-column
      fixed="right"
      label="操作"
      align="center"
      min-width="14%">
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
import { gettalentdataList } from '@/api/locowerApi';

export default {
  name: 'dataList',
  data() {
    return {
      tableHeight: (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight) - 268,
      is_show: true,
      // 加载
      loading: false,
      // 达人发现数据
      talentData: [],
      // 时间初始化设置
      cycleData: [],
      // 弹出框
      normalDialog: {
        visible: false,
        content: '',
        handleClose: () => {},
      },
      talentform: {
        talentinput: '',
        // 达人类别
        checkeddrtype: [],
        // 周月榜
        selectTm: '0',
      },
      // 设置时间
      date: [],
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
      // 默认周榜
      selectTmoptions: [
        {
          value: '0',
          label: '周榜',
        },
      ],
     
    };
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
    // 监听屏幕操作-屏幕变化
    const that = this;
    window.onresize = () => (() => {
      window.tableHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
      that.tableHeight = window.tableHeight - 268;
    })();
  },
  computed: {
    wordtit() {
      if (this.is_show === false) {
        return '收起';
      } else if (this.is_show === true) {
        return '展开';
      }
    },
  },
  created() {
    // 达人发现列表
    this.getTalentlt();
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
      this.getTalentlt(val);
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
                this.getTalentlt();
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
    // 选择
    selectData() {
      this.tableBodyDom = this.$refs.table.bodyWrapper;
      this.tableBodyDom.scrollTo(0, 0);
      this.getTalentlt();
    },
    // 切换周、月榜
    selectChanged(val) {
      console.log('val', val);
    },
    // 调用接口
    getTalentlt(arr) {
      const params = {
        kol_category: this.talentform.checkeddrtype,
      };
      // 排序
      if (arr !== undefined) {
        if (arr.prop === 'favorited') {
          params.orderBy = 1;
        }
        if (arr.prop === 'easy_rate') {
          params.orderBy = 2;
        }
      }
      this.loading = true;
      gettalentdataList(params).then((res) => {
        if (res.code === 200) {
          this.talentData = res.data.rank;
          const cycle = res.data.cycle[0];
          this.cycleData = cycle;
          // 时间设置
          this.date = [new Date(this.cycleData.begin_date), new Date(this.cycleData.end_date)];
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
.el-radio {
    &-button {
      margin-top: 7px;
    }
  }
</style>

<style lang="scss" scoped>
@import 'common/css/common.scss';
</style>

