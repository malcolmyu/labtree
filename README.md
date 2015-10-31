
# GitLab 树形文件展示工具

GitLab 树形文件展示工具的 Chrome 插件

## 安装

首先 clone 代码到本地：

    git clone git@gitlab.corp.qunar.com:minghao.yu/labtree.git

之后打开 chrome：

- 『设置』-> 『更多工具』-> 『扩展程序』
- 勾选 『开发者模式』
- 点击『加载已解压的扩展程序…』选择刚才 clone 的目录

## 使用

之后进入 GitLab 的任一项目，就会发现左上角多了一个小按钮：

![按钮](http://7xnghq.com1.z0.glb.clouddn.com/gitlab-tree-01.png)

点击按钮展开之后首先需要输入 GitLab 的用户名密码：

![登录](http://7xnghq.com1.z0.glb.clouddn.com/gitlab-tree-02.png)

点击登录，就会展示项目的树形目录结构拉~

![界面](http://7xnghq.com1.z0.glb.clouddn.com/gitlab-tree-03.png)

**PS:** 这里之所以需要登录是因为 GitLab 在获取项目目录结构时需要 token 验证，详情可以参见 [GitLab API](http://gitlab.corp.qunar.com/help/api/README.md)。
