TortoiseGit 连接oschina不用每次输入用户名和密码的方法 
http://blog.csdn.net/liukang325/article/details/24105913




--------------------------------------------------------------------oschina git 使用
http://git.oschina.net/oschina/git-osc/wikis/%E5%B8%AE%E5%8A%A9

------------------------------------生成密钥
在linux下执行
ssh-keygen -t rsa -C "137573155@qq.com"
qy123456


cat ~/.ssh/id_rsa.pub
复制
ssh-rsa AAAAB3NzaC1yc2EAAAABIwAAAQEArK6VugBzdTnnEhQ6eHLDpPUAzlxW5bCKyDVDPM+ys929gG6+kX8H8LgPoKHHNFlTp9gYA7pJ8fjcWnOkYLT+TWHRITn91SyFrVasNw5h1nZGxIl4CRHIkf/Z3uck+I58js2YOyt0ZvlOYR2zCVC/aDyvD4SPUqZ3GBrat87TuAt47kwYwPbQXq0dbJ960FfoE4zqBHCLHg8n517hkOy0jzLfHvY2XNyWoe84vGdkbHmS4cQp4LcOVdhuo2H75QxIlWWhpjQWVDIg77amWBROHUWvgbj58UZ2O0812+W1H8NwbwUT17rv4lsDbfi0ceX62LtAy+Gshh3omAAwG+WB3Q== 137573155@qq.com

到
http://git.oschina.net/zzsoszz/sms/deploy_keys/new

注意不要填写标题
ssh -T git@git.oschina.net



-------------------------------------git配置

git config --global user.name "zzsoszz"
git config --global user.email "137573155@qq.com"
137573155@qq.com
491172625


连接oschina不用每次输入用户名和密码的方法
1.在当前用户密码下修改.git-credentials文件
https://zzsoszz:491172625@git.oschina.net
2.修改.gitconfig
[user]
	name = 137573155@qq.com
	email = 137573155@qq.com
	signingkey = ""
[credential]      
    helper = store


	
	
	
--------------------------------------------









	
-----------------------------------------------实验

qingtian@qingtian-PC MINGW64 ~
$ git
usage: git [--version] [--help] [-C <path>] [-c name=value]
           [--exec-path[=<path>]] [--html-path] [--man-path] [--info-path]
           [-p | --paginate | --no-pager] [--no-replace-objects] [--bare]
           [--git-dir=<path>] [--work-tree=<path>] [--namespace=<name>]
           <command> [<args>]

These are common Git commands used in various situations:

start a working area (see also: git help tutorial)
   clone      Clone a repository into a new directory
   init       Create an empty Git repository or reinitialize an existing one

work on the current change (see also: git help everyday)
   add        Add file contents to the index
   mv         Move or rename a file, a directory, or a symlink
   reset      Reset current HEAD to the specified state
   rm         Remove files from the working tree and from the index

examine the history and state (see also: git help revisions)
   bisect     Find by binary search the change that introduced a bug
   grep       Print lines matching a pattern
   log        Show commit logs
   show       Show various types of objects
   status     Show the working tree status

grow, mark and tweak your common history
   branch     List, create, or delete branches
   checkout   Switch branches or restore working tree files
   commit     Record changes to the repository
   diff       Show changes between commits, commit and working tree, etc
   merge      Join two or more development histories together
   rebase     Forward-port local commits to the updated upstream head
   tag        Create, list, delete or verify a tag object signed with GPG

collaborate (see also: git help workflows)
   fetch      Download objects and refs from another repository
   pull       Fetch from and integrate with another repository or a local branch
   push       Update remote refs along with associated objects

'git help -a' and 'git help -g' list available subcommands and some
concept guides. See 'git help <command>' or 'git help <concept>'
to read about a specific subcommand or concept.

qingtian@qingtian-PC MINGW64 ~
$ cd d:

qingtian@qingtian-PC MINGW64 /d
$ cd bx
BxCashbackAuditTController.class  bxdev444444/
bxdev/                            bxdev_v1.0.0/

qingtian@qingtian-PC MINGW64 /d
$ cd bx
BxCashbackAuditTController.class  bxdev444444/
bxdev/                            bxdev_v1.0.0/

qingtian@qingtian-PC MINGW64 /d
$ cd bxdev/osc/

qingtian@qingtian-PC MINGW64 /d/bxdev/osc
$ dir
sms

qingtian@qingtian-PC MINGW64 /d/bxdev/osc
$ git -version
Unknown option: -version
usage: git [--version] [--help] [-C <path>] [-c name=value]
           [--exec-path[=<path>]] [--html-path] [--man-path] [--info-path]
           [-p | --paginate | --no-pager] [--no-replace-objects] [--bare]
           [--git-dir=<path>] [--work-tree=<path>] [--namespace=<name>]
           <command> [<args>]

qingtian@qingtian-PC MINGW64 /d/bxdev/osc
$ git --version
git version 2.5.0.windows.1

qingtian@qingtian-PC MINGW64 /d/bxdev/osc
$ cd sms

qingtian@qingtian-PC MINGW64 /d/bxdev/osc/sms ($feature_name)
$ git config
Display all 285 possibilities? (y or n)
add.ignoreErrors                gitcvs.logfile
advice.commitBeforeMerge        gitcvs.usecrlfattr
advice.detachedHead             gui.blamehistoryctx
advice.implicitIdentity         gui.commitmsgwidth
advice.pushNonFastForward       gui.copyblamethreshold
advice.resolveConflict          gui.diffcontext
advice.statusHints              gui.encoding
alias.                          gui.fastcopyblame
am.keepcr                       gui.matchtrackingbranch
apply.ignorewhitespace          gui.newbranchtemplate
apply.whitespace                gui.pruneduringfetch
branch.                         gui.spellingdictionary
branch.autosetupmerge           gui.trustmtime
branch.autosetuprebase          guitool.
browser.                        help.autocorrect
clean.requireForce              help.browser
color.branch                    help.format
color.branch.current            http.lowSpeedLimit
color.branch.local              http.lowSpeedTime
color.branch.plain              http.maxRequests
color.branch.remote             http.minSessions
color.decorate.HEAD             http.noEPSV
color.decorate.branch           http.postBuffer
color.decorate.remoteBranch     http.proxy
color.decorate.stash            http.sslCAInfo
color.decorate.tag              http.sslCAPath
color.diff                      http.sslCert
color.diff.commit               http.sslCertPasswordProtected
color.diff.frag                 http.sslCipherList
color.diff.func                 http.sslKey
color.diff.meta                 http.sslVerify
color.diff.new                  http.useragent
color.diff.old                  i18n.commitEncoding
color.diff.plain                i18n.logOutputEncoding
color.diff.whitespace           imap.authMethod
color.grep                      imap.folder
color.grep.context              imap.host
--More--$ git config ^C

qingtian@qingtian-PC MINGW64 /d/bxdev/osc/sms ($feature_name)
$ cd ..

qingtian@qingtian-PC MINGW64 /d/bxdev/osc
$ dir
sms

qingtian@qingtian-PC MINGW64 /d/bxdev/osc
$ git init  git_basics
Initialized empty Git repository in D:/bxdev/osc/git_basics/.git/

qingtian@qingtian-PC MINGW64 /d/bxdev/osc
$ cd git_basics/

qingtian@qingtian-PC MINGW64 /d/bxdev/osc/git_basics (master)
$ touch a

qingtian@qingtian-PC MINGW64 /d/bxdev/osc/git_basics (master)
$ touch b

qingtian@qingtian-PC MINGW64 /d/bxdev/osc/git_basics (master)
$ git add a b

qingtian@qingtian-PC MINGW64 /d/bxdev/osc/git_basics (master)
$ git status
On branch master

Initial commit

Changes to be committed:
  (use "git rm --cached <file>..." to unstage)

        new file:   a
        new file:   b


qingtian@qingtian-PC MINGW64 /d/bxdev/osc/git_basics (master)
$ git commit
[master (root-commit) b8a8f29] qingtian
 2 files changed, 0 insertions(+), 0 deletions(-)
 create mode 100644 a
 create mode 100644 b

qingtian@qingtian-PC MINGW64 /d/bxdev/osc/git_basics (master)
$ git commit -m "init"
On branch master
nothing to commit, working directory clean

qingtian@qingtian-PC MINGW64 /d/bxdev/osc/git_basics (master)
$ vi a

qingtian@qingtian-PC MINGW64 /d/bxdev/osc/git_basics (master)
$ git status
On branch master
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

        modified:   a

no changes added to commit (use "git add" and/or "git commit -a")

qingtian@qingtian-PC MINGW64 /d/bxdev/osc/git_basics (master)
$ git commit -m "init"
On branch master
Changes not staged for commit:
        modified:   a

no changes added to commit

qingtian@qingtian-PC MINGW64 /d/bxdev/osc/git_basics (master)
$ git add a
warning: LF will be replaced by CRLF in a.
The file will have its original line endings in your working directory.

qingtian@qingtian-PC MINGW64 /d/bxdev/osc/git_basics (master)
$ git commit -m "init"
[master warning: LF will be replaced by CRLF in a.
The file will have its original line endings in your working directory.
301cd57] init
warning: LF will be replaced by CRLF in a.
The file will have its original line endings in your working directory.
 1 file changed, 1 insertion(+)

qingtian@qingtian-PC MINGW64 /d/bxdev/osc/git_basics (master)
$ git rm a
rm 'a'

qingtian@qingtian-PC MINGW64 /d/bxdev/osc/git_basics (master)
$ git status
On branch master
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

        deleted:    a


qingtian@qingtian-PC MINGW64 /d/bxdev/osc/git_basics (master)
$ git rest HEAD a
git: 'rest' is not a git command. See 'git --help'.

Did you mean this?
        reset

qingtian@qingtian-PC MINGW64 /d/bxdev/osc/git_basics (master)
$ git reset HEAD a
Unstaged changes after reset:
D       a

qingtian@qingtian-PC MINGW64 /d/bxdev/osc/git_basics (master)
$ git checout a
git: 'checout' is not a git command. See 'git --help'.

Did you mean this?
        checkout

qingtian@qingtian-PC MINGW64 /d/bxdev/osc/git_basics (master)
$ git cheackout a
git: 'cheackout' is not a git command. See 'git --help'.

Did you mean this?
        checkout

qingtian@qingtian-PC MINGW64 /d/bxdev/osc/git_basics (master)
$ git checkout a

qingtian@qingtian-PC MINGW64 /d/bxdev/osc/git_basics (master)
$
