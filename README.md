# TUNet History

清华校园网上网明细统计分析

## Usage

    git clone https://github.com/lizy14/tunet-history.git
    cd tunet-history
    npm install
    node index

按照提示输入用户名和密码，稍等片刻，你将在 `./output/` 目录下得到

* `monthly.csv` 对应于“上网明细统计”
* `verbose.csv` 对应于“上网明细”

分析逻辑还没写，目前你可以用 Excel 对以上两个文件进行处理，比如绘制统计图

![Excel 绘图](https://raw.githubusercontent.com/lizy14/tunet-history/master/demos/excel.png)

## TODO

* 实现分析逻辑
* 可视化
* 重构以终结回调地狱
* 错误处理
