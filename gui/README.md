# GUI

Part of the service which is responsible for an User interaction.

## Dependencies

1. Node.js & npm
2. gulp

## Install & Run

1 . Clone repository

```sh
git clone https://github.com/avatar29A/letscutit
```

Go to service directory

```sh
cd letscutit
```

2 . Install node.js & npm

**Notes**: *Might be it's required root permissions*.

3. Install gulp

```sh
sudo npm install -g gulp 
```

4 . Go to **gui** directory

```sh
cd gui
```

5 . Install dependencies from npm's repository

```sh
npm install
```

6 . Run gulp

```sh
gulp
```

7 . Run it

```sh
npm start
```

than should open window in your browser with 'http://0.0.0.0:3000'.

## Docker

```
cd letscutit
```

1. build

```sh
docker-compose build gui
```

2. run

```sh
docker-compose up gui
```

Notes: If docker run under Windows, need to prepare VirtualBox:

```sh
VBoxManage setextradata VM_NAME VBoxInternal2/SharedFoldersEnableSymlinksCreate/SHARE_NAME 1
```

where **VM_NAME** is name your virtual machine and **SHARE_NAME** is name shared folder (you can see that in VB)