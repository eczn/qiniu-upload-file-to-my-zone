
> qiniu-upload-file-to-my-zone

# up2zone 

This is a cli tool for qiniu. 

# install 

``` bash 
$ npm i -g qiniu-upload-file-to-my-zone
```

and then run this for test : 

``` bash
$ up2zone hello 
```

# up2zone config 

we should config up2zone at the first. just run this command as follow, up2zone will help you to config it. 

``` bash 
$ up2zone config 
```

# up2zone up 

this is common structure of `up` sub-command: 

> up2zone up \[location\] \[remote\]

up2zone will go through and collect all the file in `location`, and upload them to `remote` 

here is an example: 

## Example for up

if i have such a file tree: 

``` bash 
hello
  | index.html 
  | css
  |   | main.css 
  | js
  |   | main.js
```

and this is my config:

``` json
{
    "AK": "******", 
    "SK": "******", 
    "DOMAIN": "http://a.com", 
    "BUCKET": "my-test"
}
```

and run `up2zone up` to upload `path/to/hello`

``` bash
$ up2zone up path/to/hello qiniu-hello
```

and all the files in path/to/hello will be uploaded to your qiniu bucket, and the url is: 

``` bash
http://a.com/qiniu-hello/index.html
http://a.com/qiniu-hello/css/main.css
http://a.com/qiniu-hello/js/main.js
```


# emmmm ... 

building ... 


# LICENSE 

MIT 

