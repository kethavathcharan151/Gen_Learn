export const saveUserData = (user: any) => {
  try {
    localStorage.setItem('genlearn_user', JSON.stringify(user));
  } catch (error) {
    console.error('Error saving user data:', error);
  }
};

export const loadUserData = () => {
  try {
    const userData = localStorage.getItem('genlearn_user');
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error('Error loading user data:', error);
    return null;
  }
};

export const clearUserData = () => {
  try {
    localStorage.removeItem('genlearn_user');
  } catch (error) {
    console.error('Error clearing user data:', error);
  }
};

export const saveAssignments = (assignments: any[]) => {
  try {
    localStorage.setItem('genlearn_assignments', JSON.stringify(assignments));
  } catch (error) {
    console.error('Error saving assignments:', error);
  }
};

export const loadAssignments = () => {
  try {
    const assignments = localStorage.getItem('genlearn_assignments');
    return assignments ? JSON.parse(assignments) : [];
  } catch (error) {
    console.error('Error loading assignments:', error);
    return [];
  }
};