import { useState } from 'react';


// ----------------------------------------------------------------------




const InputField = ({ value, label, name, placeholder, type, onChange }) => (
  <div className="form-group">
    {label && <label htmlFor="input-field">{label}</label>}
    <input
      type={type}
      value={value}
      name={name}
      className="form-control"
      placeholder={placeholder}
      onChange={onChange}
    />
  </div>
);



const AddDogForm = () => {
  const [inputValue, setInputValue] = useState({ dog_name: "", dog_profile_picture: "", dog_description: "", date_birth: "", date_passing:"" });
  const { dog_name, dog_profile_picture, dog_description, date_birth, date_passing} = inputValue;

  const handleChange = (e) => {
    const { dog_name, dog_profile_picture, dog_description, date_birth, date_passing } = e.target;
    setInputValue((prev) => ({
      ...prev,
      [dog_name]: value,
    }));
    console.log(inputValue);
  };

  return (
     <Form>
       <InputField
         type="text"
         value={dog_name}
         placeholder="Dog's Name"
         label="Name"
         name="name"
         onChange={handleChange}
       />
       <InputField
         type="text"
         value={dog_description}
         placeholder="Add bio"
         label="Bio"
         name="Bio"
         onChange={handleChange}
       />
        <InputField
         type="text"
         value={date_birth}
         placeholder="Add birthday"
         label="Birthday"
         name="Birthday"
         onChange={handleChange}
       />
          <InputField
         type="text"
         value={date_passing}
         placeholder="Death anniversary"
         label="Date of passing"
         name="Date of passing"
         onChange={handleChange}
       />
       <Button color="primary">Add</Button>{" "}
       <Button color="secondary">Cancel</Button>
     </Form>
  );
};

export default {AddDogForm, InputField };


<Box
component="form"
sx={{
  '& .MuiTextField-root': { m: 1, width: '25ch' },
}}
noValidate
autoComplete="off"
>
<div>
<TextField
  required
  id="filled-required"
  label="Required"
  defaultValue="Name"
  variant="filled"
/>
</div>
</Box>
