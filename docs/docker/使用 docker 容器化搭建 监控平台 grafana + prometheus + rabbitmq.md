# 使用 docker 容器化搭建监控平台
**以下是各组件官网地址**
[docker 官网](https://www.docker.com/)
[grafana 官网](https://grafana.com/)
[rabbitmq 官网](https://rabbitmq.com/)
[prometheus 官网](https://prometheus.io/)
**本文章默认您已安装 docker 并且会使用一些基础的 docker 命令**
## 一、 docker 安装 rabbitmq
```shell
docker run -itd  --name rabbitmq -p 5672:5672 -p 15672:15672 -p 15692:15692 rabbitmq:3.10-management
```
**本地访问: http://localhost:15672/ 出现登录界面说明启动成功**
![在这里插入图片描述](https://img-blog.csdnimg.cn/bebccce4e9b74f868c62aedd3841e961.png)
![在这里插入图片描述](https://img-blog.csdnimg.cn/58627e4251c0487ea3f01d1b8ad9e493.png)
## 二、docker 安装 prometheus
**先准备好 prometheus.yml 文件**
```yaml
global:
  scrape_interval:     15s # By default, scrape targets every 15 seconds.

  # Attach these labels to any time series or alerts when communicating with
  # external systems (federation, remote storage, Alertmanager).
  external_labels:
    monitor: 'codelab-monitor'

# A scrape configuration containing exactly one endpoint to scrape:
# Here it's Prometheus itself.
scrape_configs:
  # The job name is added as a label `job=<job_name>` to any timeseries scraped from this config.
  - job_name: 'prometheus'

    # Override the global default and scrape targets from this job every 5 seconds.
    scrape_interval: 5s
	# 使用IP地址的原因是为了防止所有容器并不是部署同一台机器内
    static_configs:
      - targets: ['192.168.16.102:9090']
  - job_name: 'rabbitmq'
    scrape_interval: 5s
    static_configs:
      - targets: ['192.168.16.102:15692']
```
```bash
docker run -itd --name=prometheus -p 9090:9090 -v D:\Docker\cli-plugins\prometheus\prometheus.yml:/etc/prometheus/prometheus.yml prom/prometheus
```
**本地访问: http://localhost:9090/** 
![在这里插入图片描述](https://img-blog.csdnimg.cn/1f4b9c936fe4431ca2f714e2acca501b.png)![在这里插入图片描述](https://img-blog.csdnimg.cn/9c608a049a4c4801ab9aeeae3e05ae0a.png)
## 三、docker 安装 grafana
```bash
docker run -itd --name=grafana -p 3000:3000 grafana/grafana
```
本地访问：
![在这里插入图片描述](https://img-blog.csdnimg.cn/7ed2d3a2f0704a80ab44edc4c0898cff.png)
![在这里插入图片描述](https://img-blog.csdnimg.cn/15aaef61419a4254b23fb243e7876c5c.png)
## 四、配置 grafana 实现监控图形可视化
**4.1添加 prometheus 数据源**
![在这里插入图片描述](https://img-blog.csdnimg.cn/106dd7968e6240ffb4e5632fc761a1d7.png)
![在这里插入图片描述](https://img-blog.csdnimg.cn/cbfe9a0571c3470298e6653176d19ad5.png)
**4.2 配置 rabbitmq 监控模板**
[grafana 模板搜索地址](https://grafana.com/grafana/dashboards/)
搜索之后找到自己需要的 下载即可
![在这里插入图片描述](https://img-blog.csdnimg.cn/f8a278ba4ea943029e4da55c505edc64.png)
![在这里插入图片描述](https://img-blog.csdnimg.cn/92a9c725d3e04f0d90c5c1cabc355eec.png)
**在 grafana 管理界面 导入 刚刚下载的模板**
![在这里插入图片描述](https://img-blog.csdnimg.cn/f6f0faab65b749e6bca5365d7966f03e.png)
![在这里插入图片描述](https://img-blog.csdnimg.cn/c719480580de450c93fb8945b90a9591.png)
**最后就是 成功界面了**
![在这里插入图片描述](https://img-blog.csdnimg.cn/8bc2ee56bc2d43309a66b76867c7d053.png)
