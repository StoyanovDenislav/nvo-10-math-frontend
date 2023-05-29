import "./mainPage.css";
import React, { useEffect } from "react";

function MainPage() {
  return (
    <div>
      <div className="background"></div>
      <div>
        <p className="text" data-aos="fade-up" data-aos-duration="500">
          Сайт за подготовка за НВО 10. клас
        </p>
      </div>
      <div className="panel" data-aos="fade-up">
        <div
          data-aos="fade-up"
          data-aos-duration="500"
          data-aos-offset="200"
          style={{ position: "relative", top: "5vh" }}
        >
          <p className="text">Кои сме ние?</p>
          <br />
          <p className="text">
            Ние сме випуск 2025 на Английска езикова гимназия "Гео Милев", гр.
            Русе.
          </p>
          <br />
        </div>

        <div
          data-aos="fade-up"
          data-aos-duration="700"
          data-aos-offset="300"
          style={{ position: "relative", top: "5vh" }}
        >
          <p className="text">Нашата цел?</p>
          <br />
          <p className="text">Стремеж към по-високи успехи.</p>
          <br />
        </div>
        <div
          data-aos="fade-up"
          data-aos-duration="700"
          data-aos-offset="600"
          style={{ position: "relative", top: "5vh" }}
        >
          <p className="text">Проблемът?</p>
          <br />
          <p className="text">Недостатъчен брой варианти за НВО за 10. клас</p>
          <br />
        </div>

        <div
          data-aos="fade-up"
          data-aos-duration="700"
          data-aos-offset="500"
          style={{ position: "relative", top: "5vh" }}
        >
          <p className="text">Решението.</p>
          <br />
          <p className="text">
            Под ръководството на госпожа Диляна Стефчова - учител по математика,
            създадохме 20 авторски варианта за НВО за 10. клас по математика, с
            цел подобряване на компетентностите по предмета и задълбочена
            подготовка за предстоящото НВО.
          </p>
          <br />
        </div>
      </div>
    </div>
  );
}

export default MainPage;
