import React from "react";

interface Notification {
  id: number;
  mensaje: string;
  color: string;
  visible: boolean;
}

interface NotificationProps {
  notificaciones: Notification[];
  cerrarNotificacion: (id: number) => void;
}

const Notification: React.FC<NotificationProps> = ({ notificaciones, cerrarNotificacion }) => {
  return (
    <div className="notificaciones">
      {notificaciones
        .filter((notificacion) => notificacion !== null && notificacion !== undefined)
        .map(
          (notificacion) =>
            notificacion.visible && (
              <div key={notificacion.id} className="notification__container">
                <div className={`notification__content ${notificacion.color}`}>
                  <h2 className="notification__text">{notificacion.mensaje}</h2>
                </div>
                <div className="notification__close" onClick={() => cerrarNotificacion(notificacion.id)} />
              </div>
            )
        )}
    </div>
  );
};

export default Notification;
