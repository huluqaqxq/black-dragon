"use strict";(self.webpackChunkblack_dragon=self.webpackChunkblack_dragon||[]).push([[558],{6004:(a,n,s)=>{s.r(n),s.d(n,{data:()=>e});const e={key:"v-11202638",path:"/docker/%E4%BD%BF%E7%94%A8%20docker%20%E5%AE%B9%E5%99%A8%E5%8C%96%E6%90%AD%E5%BB%BA%20%E7%9B%91%E6%8E%A7%E5%B9%B3%E5%8F%B0%20grafana%20+%20prometheus%20+%20rabbitmq.html",title:"使用 docker 容器化搭建监控平台",lang:"en-US",frontmatter:{},excerpt:"",headers:[{level:2,title:"一、 docker 安装 rabbitmq",slug:"一、-docker-安装-rabbitmq",children:[]},{level:2,title:"二、docker 安装 prometheus",slug:"二、docker-安装-prometheus",children:[]},{level:2,title:"三、docker 安装 grafana",slug:"三、docker-安装-grafana",children:[]},{level:2,title:"四、配置 grafana 实现监控图形可视化",slug:"四、配置-grafana-实现监控图形可视化",children:[]}],filePathRelative:"docker/使用 docker 容器化搭建 监控平台 grafana + prometheus + rabbitmq.md",git:{updatedTime:1668501648e3,contributors:[{name:"huluqaqxq",email:"74292567+huluqaqxq@users.noreply.github.com",commits:1}]}}},278:(a,n,s)=>{s.r(n),s.d(n,{default:()=>v});var e=s(6252);const t=(0,e._)("h1",{id:"使用-docker-容器化搭建监控平台"},[(0,e._)("a",{class:"header-anchor",href:"#使用-docker-容器化搭建监控平台"},"#"),(0,e.Uk)(" 使用 docker 容器化搭建监控平台")],-1),r=(0,e._)("strong",null,"以下是各组件官网地址",-1),p={href:"https://www.docker.com/",target:"_blank",rel:"noopener noreferrer"},c={href:"https://grafana.com/",target:"_blank",rel:"noopener noreferrer"},l={href:"https://rabbitmq.com/",target:"_blank",rel:"noopener noreferrer"},o={href:"https://prometheus.io/",target:"_blank",rel:"noopener noreferrer"},i=(0,e._)("strong",null,"本文章默认您已安装 docker 并且会使用一些基础的 docker 命令",-1),m=(0,e.uE)('<h2 id="一、-docker-安装-rabbitmq"><a class="header-anchor" href="#一、-docker-安装-rabbitmq">#</a> 一、 docker 安装 rabbitmq</h2><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">docker</span> run <span class="token parameter variable">-itd</span>  <span class="token parameter variable">--name</span> rabbitmq <span class="token parameter variable">-p</span> <span class="token number">5672</span>:5672 <span class="token parameter variable">-p</span> <span class="token number">15672</span>:15672 <span class="token parameter variable">-p</span> <span class="token number">15692</span>:15692 rabbitmq:3.10-management\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p><strong>本地访问: http://localhost:15672/ 出现登录界面说明启动成功</strong><img src="https://img-blog.csdnimg.cn/bebccce4e9b74f868c62aedd3841e961.png" alt="在这里插入图片描述"><img src="https://img-blog.csdnimg.cn/58627e4251c0487ea3f01d1b8ad9e493.png" alt="在这里插入图片描述"></p><h2 id="二、docker-安装-prometheus"><a class="header-anchor" href="#二、docker-安装-prometheus">#</a> 二、docker 安装 prometheus</h2><p><strong>先准备好 prometheus.yml 文件</strong></p><div class="language-yaml ext-yml line-numbers-mode"><pre class="language-yaml"><code><span class="token key atrule">global</span><span class="token punctuation">:</span>\n  <span class="token key atrule">scrape_interval</span><span class="token punctuation">:</span>     15s <span class="token comment"># By default, scrape targets every 15 seconds.</span>\n\n  <span class="token comment"># Attach these labels to any time series or alerts when communicating with</span>\n  <span class="token comment"># external systems (federation, remote storage, Alertmanager).</span>\n  <span class="token key atrule">external_labels</span><span class="token punctuation">:</span>\n    <span class="token key atrule">monitor</span><span class="token punctuation">:</span> <span class="token string">&#39;codelab-monitor&#39;</span>\n\n<span class="token comment"># A scrape configuration containing exactly one endpoint to scrape:</span>\n<span class="token comment"># Here it&#39;s Prometheus itself.</span>\n<span class="token key atrule">scrape_configs</span><span class="token punctuation">:</span>\n  <span class="token comment"># The job name is added as a label `job=&lt;job_name&gt;` to any timeseries scraped from this config.</span>\n  <span class="token punctuation">-</span> <span class="token key atrule">job_name</span><span class="token punctuation">:</span> <span class="token string">&#39;prometheus&#39;</span>\n\n    <span class="token comment"># Override the global default and scrape targets from this job every 5 seconds.</span>\n    <span class="token key atrule">scrape_interval</span><span class="token punctuation">:</span> 5s\n\t<span class="token comment"># 使用IP地址的原因是为了防止所有容器并不是部署同一台机器内</span>\n    <span class="token key atrule">static_configs</span><span class="token punctuation">:</span>\n      <span class="token punctuation">-</span> <span class="token key atrule">targets</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&#39;192.168.16.102:9090&#39;</span><span class="token punctuation">]</span>\n  <span class="token punctuation">-</span> <span class="token key atrule">job_name</span><span class="token punctuation">:</span> <span class="token string">&#39;rabbitmq&#39;</span>\n    <span class="token key atrule">scrape_interval</span><span class="token punctuation">:</span> 5s\n    <span class="token key atrule">static_configs</span><span class="token punctuation">:</span>\n      <span class="token punctuation">-</span> <span class="token key atrule">targets</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&#39;192.168.16.102:15692&#39;</span><span class="token punctuation">]</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br></div></div><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">docker</span> run <span class="token parameter variable">-itd</span> <span class="token parameter variable">--name</span><span class="token operator">=</span>prometheus <span class="token parameter variable">-p</span> <span class="token number">9090</span>:9090 <span class="token parameter variable">-v</span> D:<span class="token punctuation">\\</span>Docker<span class="token punctuation">\\</span>cli-plugins<span class="token punctuation">\\</span>prometheus<span class="token punctuation">\\</span>prometheus.yml:/etc/prometheus/prometheus.yml prom/prometheus\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p><strong>本地访问: http://localhost:9090/</strong><img src="https://img-blog.csdnimg.cn/1f4b9c936fe4431ca2f714e2acca501b.png" alt="在这里插入图片描述"><img src="https://img-blog.csdnimg.cn/9c608a049a4c4801ab9aeeae3e05ae0a.png" alt="在这里插入图片描述"></p><h2 id="三、docker-安装-grafana"><a class="header-anchor" href="#三、docker-安装-grafana">#</a> 三、docker 安装 grafana</h2><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">docker</span> run <span class="token parameter variable">-itd</span> <span class="token parameter variable">--name</span><span class="token operator">=</span>grafana <span class="token parameter variable">-p</span> <span class="token number">3000</span>:3000 grafana/grafana\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>本地访问： <img src="https://img-blog.csdnimg.cn/7ed2d3a2f0704a80ab44edc4c0898cff.png" alt="在这里插入图片描述"><img src="https://img-blog.csdnimg.cn/15aaef61419a4254b23fb243e7876c5c.png" alt="在这里插入图片描述"></p><h2 id="四、配置-grafana-实现监控图形可视化"><a class="header-anchor" href="#四、配置-grafana-实现监控图形可视化">#</a> 四、配置 grafana 实现监控图形可视化</h2>',12),u=(0,e._)("strong",null,"4.1添加 prometheus 数据源",-1),b=(0,e._)("img",{src:"https://img-blog.csdnimg.cn/106dd7968e6240ffb4e5632fc761a1d7.png",alt:"在这里插入图片描述"},null,-1),g=(0,e._)("img",{src:"https://img-blog.csdnimg.cn/cbfe9a0571c3470298e6653176d19ad5.png",alt:"在这里插入图片描述"},null,-1),k=(0,e._)("strong",null,"4.2 配置 rabbitmq 监控模板",-1),d={href:"https://grafana.com/grafana/dashboards/",target:"_blank",rel:"noopener noreferrer"},h=(0,e.uE)('<img src="https://img-blog.csdnimg.cn/f8a278ba4ea943029e4da55c505edc64.png" alt="在这里插入图片描述"><img src="https://img-blog.csdnimg.cn/92a9c725d3e04f0d90c5c1cabc355eec.png" alt="在这里插入图片描述"><strong>在 grafana 管理界面 导入 刚刚下载的模板</strong><img src="https://img-blog.csdnimg.cn/f6f0faab65b749e6bca5365d7966f03e.png" alt="在这里插入图片描述"><img src="https://img-blog.csdnimg.cn/c719480580de450c93fb8945b90a9591.png" alt="在这里插入图片描述"><strong>最后就是 成功界面了</strong><img src="https://img-blog.csdnimg.cn/8bc2ee56bc2d43309a66b76867c7d053.png" alt="在这里插入图片描述">',7),f={},v=(0,s(3744).Z)(f,[["render",function(a,n){const s=(0,e.up)("OutboundLink");return(0,e.wg)(),(0,e.iD)(e.HY,null,[t,(0,e._)("p",null,[r,(0,e._)("a",p,[(0,e.Uk)("docker 官网"),(0,e.Wm)(s)]),(0,e._)("a",c,[(0,e.Uk)("grafana 官网"),(0,e.Wm)(s)]),(0,e._)("a",l,[(0,e.Uk)("rabbitmq 官网"),(0,e.Wm)(s)]),(0,e._)("a",o,[(0,e.Uk)("prometheus 官网"),(0,e.Wm)(s)]),i]),m,(0,e._)("p",null,[u,b,g,k,(0,e._)("a",d,[(0,e.Uk)("grafana 模板搜索地址"),(0,e.Wm)(s)]),(0,e.Uk)(" 搜索之后找到自己需要的 下载即可 "),h])],64)}]])}}]);