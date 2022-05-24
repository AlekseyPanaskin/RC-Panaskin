import express from "express";
const app = express();

app.use((req, res, next) => {
  let log = {
      method: req.method,
      url: req.url,
      statusCode: res.statusCode
  }

  console.log(log);

  next();
});

const PUBLIC_DIR = "public";
app.use(express.static(PUBLIC_DIR));


app.use(express.json());


app.post("/post", (req, res) => {
  if (req.headers['content-type'] != "application/json") {
    res.statusCode = 400;

    let data = {
      status: "error",
      message: "Неверный тип данных",
    };

    res.send(data);
    return;
  }

  if (!req.body) {
    res.statusCode = 400;

    const data = {
      status: "error",
      message: "Не обнаружены данные",
    };

    res.send(data);
    return;
  }

  if (!req.body.name) {
    res.statusCode = 400;

    const data = {
      status: "error",
      message: "Не хватает данных",
    };

    res.send(data);
    return;
  }


  if (!req.body.date) {
    res.statusCode = 400;

    const data = {
      status: "error",
      message: "Не хватает данных",
    };

    res.send(data);
    return;
  }

  if (!Date.parse(req.body.date)) {
    res.statusCode = 400;

    const data = {
      status: "error",
      message: "Неверные данные в форме",
    };

    res.send(data);
    return;
  }
  
  if (req.body.days_counter && !Number(req.body.days_counter)) {
    res.statusCode = 400;

    const data = {
      status: "error",
      message: "Неверные данные в форме",
    };

    res.send(data);
    return;
  }

  let data = {
    status: "ok",
    name: req.body.name,
    date: req.body.date,
    ship: req.body.ship,
    days_counter: req.body.days_counter,
  };

  res.statusCode = 200;
  res.send(data);
});

const port = process.env.PORT || 5500;
app.listen(port, () => console.log(`Server started at port ${port}`));
