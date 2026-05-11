// src/contexts/AlertContext.tsx
import { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export type AlertType = 'success' | 'error' | 'info' | 'warning';

export interface Alert {
  id: string;
  type: AlertType;
  message: string;
}

interface AlertContextType {
  alerts: Alert[];
  showAlert: (message: string, type: AlertType, duration?: number) => void;
  removeAlert: (id: string) => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlert must be used within AlertProvider');
  }
  return context;
};

export const AlertProvider = ({ children }: { children: React.ReactNode }) => {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  const removeAlert = useCallback((id: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
  }, []);

  const showAlert = useCallback((message: string, type: AlertType, duration = 4000) => {
    const id = Date.now().toString();
    const alert: Alert = { id, message, type };
    
    setAlerts(prev => [...prev, alert]);
    
    if (duration > 0) {
      setTimeout(() => removeAlert(id), duration);
    }
  }, [removeAlert]);

  return (
    <AlertContext.Provider value={{ alerts, showAlert, removeAlert }}>
      {children}
      <AlertNotifications alerts={alerts} onRemove={removeAlert} />
    </AlertContext.Provider>
  );
};

/**
 * Alert Notifications Display Component
 */
const AlertNotifications = ({ alerts, onRemove }: { alerts: Alert[]; onRemove: (id: string) => void }) => {
  const getAlertStyles = (type: AlertType) => {
    const styles = {
      success: 'bg-green-50 border-green-200 text-green-800',
      error: 'bg-red-50 border-red-200 text-red-800',
      info: 'bg-blue-50 border-blue-200 text-blue-800',
      warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    };
    return styles[type];
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2 max-w-sm">
      <AnimatePresence>
        {alerts.map(alert => (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className={`border rounded-lg p-4 ${getAlertStyles(alert.type)}`}
          >
            <div className="flex justify-between items-start gap-3">
              <p className="text-sm">{alert.message}</p>
              <button
                onClick={() => onRemove(alert.id)}
                className="text-lg leading-none opacity-70 hover:opacity-100"
              >
                ×
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
