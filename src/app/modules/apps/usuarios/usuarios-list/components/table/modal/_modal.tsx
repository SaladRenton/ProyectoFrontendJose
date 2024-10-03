import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, CircularProgress, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { UserModelWithRol } from '../../../../../../auth';
import RolesCombo from '../../../../../../combos/components/RolesCombo';
import TransportistaCombo from '../../../../../../combos/components/TransportistaCombo';

interface UsuarioModalProps {
  open: boolean;
  editMode: boolean;
  currentUsuario: UserModelWithRol;
  modalLoading: boolean;
  modalErrors: string[];
  onClose: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  onRoleChange: (value: number) => void;
  onTransportistaChange: (value: number | string) => void;
}

const UserModal: React.FC<UsuarioModalProps> = ({
  open,
  editMode,
  currentUsuario,
  modalLoading,
  modalErrors,
  onClose,
  onChange,
  onSubmit,
  onRoleChange,
  onTransportistaChange
}) => {
  const [isRoleFive, setIsRoleFive] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (currentUsuario.roles && currentUsuario.roles[0] && currentUsuario.roles[0].id === 5) {
      setIsRoleFive(true);
    } else {
      setIsRoleFive(false);
    }
  }, [currentUsuario.roles]);

  const handleRoleChange = (value: number) => {
    onRoleChange(value);
    if (value === 5) {
      setIsRoleFive(true);
    } else {
      setIsRoleFive(false);
      onTransportistaChange(0); // Clear transportista when role is not 5
    }
  };

  const generatePassword = () => {
    const newPassword = Math.random().toString(36).slice(-8);
    onChange({ target: { name: 'password', value: newPassword } } as React.ChangeEvent<HTMLInputElement>);
  };

  const isEmailValid = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleFormSubmit = () => {
    if (!currentUsuario.name) {
      setValidationError('El nombre es obligatorio.');
      return;
    }
    if (!currentUsuario.email || !isEmailValid(currentUsuario.email)) {
      setValidationError('El correo electrónico es obligatorio y debe tener un formato válido.');
      return;
    }
    if (!currentUsuario.password || currentUsuario.password.length < 8) {
      setValidationError('La contraseña es obligatoria y debe tener al menos 8 caracteres.');
      return;
    }
    if (!currentUsuario.roles || currentUsuario.roles.length === 0) {
      setValidationError('El rol es obligatorio.');
      return;
    }
    setValidationError(null);
    onSubmit();
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{editMode ? 'Editar Usuario' : 'Agregar Nuevo Usuario'}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Nombre"
          fullWidth
          required
          value={currentUsuario.name || ''}
          onChange={onChange}
          name="name"
        />
        <TextField
          margin="dense"
          label="Email"
          fullWidth
          required
          value={currentUsuario.email || ''}
          onChange={onChange}
          name="email"
        />

        <TextField
          margin="dense"
          label="Celular"
          fullWidth
          required
          value={currentUsuario.celular || ''}
          onChange={onChange}
          name="celular"
        />
        <TextField
          margin="dense"
          label="Password"
          fullWidth
          required
          type={showPassword ? 'text' : 'password'}
          value={currentUsuario.password || ''}
          onChange={onChange}
          name="password"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleClickShowPassword}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            )
          }}
        />
        <Button onClick={generatePassword} color="primary">Generar Contraseña</Button>
        <RolesCombo
          value={((currentUsuario.roles && currentUsuario.roles[0] && currentUsuario.roles[0].id) ? currentUsuario.roles[0].id : 0)}
          onChange={handleRoleChange}
          disabled={editMode}
        />
        <TransportistaCombo
          value={((currentUsuario.persona && currentUsuario.persona.id) ? currentUsuario.persona.id : '') as string}
          onChange={onTransportistaChange}
          disabled={!isRoleFive}
        />
        {validationError && (
          <div className="alert alert-danger d-flex align-items-center p-5 mt-3">
            <span className="svg-icon svg-icon-2hx svg-icon-danger me-3">...</span>
            <div className="d-flex flex-column">
              <h5 className="mb-1">Error de Validación</h5>
              <span>{validationError}</span>
            </div>
          </div>
        )}
        {modalErrors.length > 0 && (
          <div className="alert alert-danger d-flex align-items-center p-5 mt-3">
            <span className="svg-icon svg-icon-2hx svg-icon-danger me-3">...</span>
            <div className="d-flex flex-column">
              <h5 className="mb-1">Error</h5>
              <span>{modalErrors.join(' ')}</span>
            </div>
          </div>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancelar
        </Button>
        <Button onClick={handleFormSubmit} color="primary" disabled={modalLoading}>
          {modalLoading ? <CircularProgress size={24} /> : editMode ? 'Actualizar' : 'Agregar'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserModal;
