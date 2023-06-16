**Run locally**
1. Prepare the DataBase on your local test machine
   -  Run `./backend/data/img.sql` in a DBMS (I use MySQL)
   -  Create app.ini file in `./backend/conf` filling in the DBMS info (see `./backend/conf/app.ini.example`)
2. Prepare the PyTorch env according to `./backend/data/README.txt`
3. Start the backend
   -  Install Golang dev env
   -  `cd ./backend; go run .`
4. Start the frontend
   - Install Node.JS dev env
   - `cd ./frontend; npm start` (Then the Web UI should appear at http://localhost:3000)

**recommanded**: to have a glimpse of this demo, you can directly wathch the `demo_vide.mp4`
