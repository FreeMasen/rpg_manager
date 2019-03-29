xcopy /y .\main.css .\docs 
xcopy /y .\spellBook.json .\docs
xcopy /y .\classes.json .\docs 
.\node_modules\.bin\webpack.cmd --env=prod