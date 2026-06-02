import { useEffect, useState } from "react";
import "./App.css";

const messages = [
  "Oi, tudo bem com você?",
  "Eu fiquei sabendo que você gosta de Backrooms",
  "Quer ver o filme comigo?",
  "Por favorzinho",
  "Eu juro que seguro sua mão se você ficar com medo,",
  "mas você vai ter que segurar a minha mão também pq eu sou medroso",
  "Você tá livre esse feriado?",
  "Escolhe o dia que você quiser, eu me encaixo na sua agenda",
  "Então o que me diz? Topa ir comigo?",
];

const times = [
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
];

function App() {
  const [currentMessage, setCurrentMessage] = useState(0);
  const [displayedText, setDisplayedText] = useState("");

  const [noButtonPos, setNoButtonPos] = useState({
    x: 0,
    y: 0,
  });

  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    if (showCalendar) return;

    const text = messages[currentMessage];
    setDisplayedText("");

    let index = 0;

    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(text.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [currentMessage, showCalendar]);

  const nextMessage = () => {
    if (currentMessage < messages.length - 1) {
      setCurrentMessage((prev) => prev + 1);
    }
  };

  const moveNoButton = () => {
    setNoButtonPos({
      x: Math.random() * 400 - 200,
      y: Math.random() * 200 - 100,
    });
  };

  const handleYes = () => {
    setShowCalendar(true);
  };

  const handleConfirm = async () => {
    try {
      await fetch("https://discord.com/api/webhooks/1511477810470850722/leybSKEp4LbDO9K1wAsue5DqKg1BoGq6I2wlVfYE87I5gpJmlTk7EtrK4_WxzEBxn5DL", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content:
            "💖 Ela aceitou o convite!\n\n" +
            `📅 Data: ${selectedDate}\n` +
            `🕒 Horário: ${selectedTime}`,
        }),
      });

      setConfirmed(true);
    } catch (error) {
      console.error(error);
      alert("Erro ao enviar notificação.");
    }
  };

  return (
    <div className="container">
      <div className="message-box">
        {confirmed ? (
          <>
            <h1>
             
              <br />
              Te espero no filme 🍿
            </h1>
          </>
        ) : showCalendar ? (
          <>
            <h1>Escolha o dia e horário ❤️</h1>

            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />

            <br />
            <br />

            <select
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
            >
              <option value="">Escolha um horário</option>

              {times.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>

            <br />
            <br />

            <button
              onClick={handleConfirm}
              disabled={!selectedDate || !selectedTime}
            >
              Confirmar ❤️
            </button>
          </>
        ) : (
          <>
            <h1>{displayedText}</h1>

            {currentMessage < messages.length - 1 ? (
              <button onClick={nextMessage}>
                Próximo →
              </button>
            ) : (
              <div className="answer-buttons">
                <button
                  className="yes-button"
                  onClick={handleYes}
                >
                  Sim 💖
                </button>

                <button
                  className="no-button"
                  onMouseEnter={moveNoButton}
                  onClick={moveNoButton}
                  style={{
                    transform: `translate(${noButtonPos.x}px, ${noButtonPos.y}px)`,
                  }}
                >
                  Não 😢
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;