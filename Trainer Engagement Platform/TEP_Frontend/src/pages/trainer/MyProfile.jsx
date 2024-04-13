import React, { useState, useEffect } from 'react';
import Swal from "sweetalert2";

const MyProfile = ({ email }) => {
  const [trainerData, setTrainerData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});
  const [newSkill, setNewSkill] = useState("");
  const [newSkillPrice, setNewSkillPrice] = useState("");

  useEffect(() => {
    const fetchTrainerData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/trainers/${email}`);
        if (!response.ok) {
          throw new Error('Trainer not found');
        }
        const data = await response.json();
        setTrainerData(data);
      } catch (error) {
        console.error('Error fetching trainer data:', error);
      }
    };

    fetchTrainerData();
  }, [email]);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveClick = async () => {
    try {
      console.log(trainerData)
      const response = await fetch(`http://localhost:3001/trainers/${email}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(trainerData),
      });

      if (!response.ok) {
        throw new Error('Error updating trainer data');
      }

      setIsEditing(false);
       // Show SweetAlert confirmation
       Swal.fire({
        icon: "success",
        title: "Updated Successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error('Error saving trainer data:', error);
    }
  };

  const handleChange = (key, value) => {
    if (key.startsWith('skills')) {
      const skillName = key.split('.')[1];
      const newSkills = { ...trainerData.skills, [skillName]: parseFloat(value) };
      setTrainerData({ ...trainerData, skills: newSkills });
    } else {
      setTrainerData({ ...trainerData, [key]: value });
    }
  };
  
  const handleAddSkill = () => {
    if (newSkill && newSkillPrice) {
      handleChange(`skills.${newSkill}`, newSkillPrice); // Use `handleChange` to properly update skills
      setNewSkill("");
      setNewSkillPrice("");
    }
  };
  
  const handleRemoveSkill = (skill) => {
    const newSkills = { ...trainerData.skills };
    delete newSkills[skill];
    setTrainerData({ ...trainerData, skills: newSkills });
  };

  // Define the schema fields to exclude from rendering
  const excludedFields = ['_id', 'password', '__v', 'role', 'requestDeletion','skills'];

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-semibold mb-4 ml-5 text-center">My Profile</h1>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 ml-40 mr-40">
        {Object.entries(trainerData).map(([key, value]) => {
          if (excludedFields.includes(key)) {
            return null; // Exclude the field from rendering
          }
          return (
            <div className="mb-4" key={key}>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={key}>
                {key.charAt(0).toUpperCase() + key.slice(1)} {/* Capitalize the first letter of the key */}
              </label>
              {/* Render input fields based on the type of the value */}
              <input
                className={`shadow appearance-none border ${isEditing ? 'border-gray-300' : 'border-transparent'} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                id={key}
                type="text"
                value={value}
                readOnly={!isEditing}
                placeholder={key[0].toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1').trim()} // Placeholder with capitalized first letter
                onChange={(e) => handleChange(key, e.target.value)}
              />
            </div>
          );
        })}

        {/* Render skills section */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Skills</label>
          {Object.entries(trainerData.skills || {}).map(([skill, price]) => (
            <div key={skill} className="flex items-center">
              <input
                className={`shadow appearance-none border ${isEditing ? 'border-gray-300' : 'border-transparent'} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                type="text"
                value={skill} // Render skill name
                readOnly={true}
              />
              <input
                className={`shadow appearance-none border ${isEditing ? 'border-gray-300' : 'border-transparent'} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ml-2`}
                type="text"
                value={price}
                readOnly={!isEditing}
                placeholder={`Per Day Charge For skill ${skill}`}
                onChange={(e) => handleChange(`skills.${skill}`, e.target.value)}
              />
              {isEditing && (
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
                  onClick={() => handleRemoveSkill(skill)}
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          {/* Input fields for adding a new skill */}
          {isEditing && (
            <div className="flex items-center mt-2">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="New Skill"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
              />
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ml-2"
                type="text"
                placeholder="Price"
                value={newSkillPrice}
                onChange={(e) => setNewSkillPrice(e.target.value)}
              />
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
                onClick={handleAddSkill}
              >
                Add
              </button>
            </div>
          )}
        </div>

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={isEditing ? handleSaveClick : handleEditClick}
        >
          {isEditing ? 'Save' : 'Edit'}
        </button>

        {isEditing && (
          <button
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2"
            onClick={handleEditClick}
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
};

export default MyProfile;














