import React, { useState, useEffect } from "react";

const FormTimer = () => {
  const [tiempoRestante, setTiempoRestante] = useState(300); // 5 ninutes
  const [formularioCompletado, setFormularioCompletado] = useState(false);

  useEffect(() => {
    let temporizador;

    if (tiempoRestante > 0) {
      temporizador = setTimeout(() => {
        setTiempoRestante((prevTiempo) => prevTiempo - 1);
      }, 1000); // Actualiza cada segundo
    } else if (tiempoRestante === 0 && !formularioCompletado) {
      alert(
        "¡The time has expired! You must complete the form within 5 minutes."
      );
    }

    // Limpia el temporizador cuando el componente se desmonta o cuando el formulario está completado
    return () => clearTimeout(temporizador);
  }, [tiempoRestante, formularioCompletado]);

  const manejarEnvioFormulario = () => {
    setFormularioCompletado(true);
  };

  const minutos = Math.floor(tiempoRestante / 60);
  const segundos=tiempoRestante % 60; 
  const formatSeconds = () => (segundos < 10 ? `0${segundos}` : segundos);
  const formatMinutes = () => (minutos < 10 ? `0 ${minutos}` : minutos);
  return { minutos, segundos,formatMinutes, formatSeconds, setTiempoRestante, setFormularioCompletado };
};

export default FormTimer;
