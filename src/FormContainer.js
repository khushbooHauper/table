import { useEffect, useState } from 'react';
import { Button, Modal } from '@material-ui/core';
import { Stepper, Step, StepLabel } from '@material-ui/core';
import { Step1, Step2, Step3, Step4 } from './Multiform';
import { nextStep, prevStep, setCurrentStep, setFormData } from './redux/formSlice';
import { useDispatch, useSelector } from 'react-redux';
import EditForm from './EditForm';

const FormContainer = () => {
  const dispatch = useDispatch();
  const currentStep = useSelector((state) => state.form.currentStep);
  const formData = useSelector((state) => state.form.formData)
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [onSuccess, setOnSuccess] = useState(false);




  const handleSubmit = (values, { setSubmitting }) => {
    if (currentStep === 1) {
      setOnSuccess(true);
    } else {
      // handle form submission here
      console.log(values);
      setSubmitting(false);
    }
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentStep(0);
  };

  const next = () => {
    dispatch(nextStep());
  };

  const prev = () => {
    dispatch(prevStep());
  };
  const handleReset = () => {
    dispatch(setCurrentStep(1));
    dispatch(setFormData(formData));
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <div>
            {currentStep === 0 && (
              <>
                {!editMode && <Step1 formData={formData} next={next} />}
                {editMode && (
                  <EditForm />
                )}
              </>
            )}
          </div>
        );
      case 1:
        return (
          <div>
            {currentStep === 1 && (
              <>

                {!editMode && (
                  <Step2 formData={formData} prev={prev} next={next} />
                )}
                {editMode && (
                  <EditForm prev={prev} next={next} />
                )}
              </>
            )}
          </div>
        );
      case 2:
        return (
          <div>
            {currentStep === 2 && (
              <>
                {!editMode && <Step3 formData={formData} prev={prev} next={next} />}
                {editMode && (
                  <EditForm prev={prev} next={next} />
                )}
              </>
            )}
          </div>
        );
      case 3:
        return (
          <div>
            {currentStep === 3 && (
              <>
                {!editMode && <Step4 formData={formData} prev={prev} />}
                {editMode && (
                  <EditForm prev={prev} next={next} />
                )}
              </>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpen} style={{ marginBottom: '70px' }}>
        {editMode ? 'Edit User' : 'Add User'}
      </Button>
      <Modal open={open} onClose={handleClose}>
        <div style={{ backgroundColor: 'white', padding: '2rem', minHeight: '500px', width: '800px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
          <Stepper activeStep={currentStep}>
            <Step>
              <StepLabel>Personal Information</StepLabel>
            </Step>
            <Step>
              <StepLabel>Banking Details</StepLabel>
            </Step>
            <Step>
              <StepLabel>Education</StepLabel>
            </Step>
            <Step>
              <StepLabel>Experience</StepLabel>
            </Step>

          </Stepper>
          {getStepContent(currentStep)}
        </div>
      </Modal>
    </div>
  );
};

export default FormContainer;
