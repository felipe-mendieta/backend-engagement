class Room {
  constructor(code) {
    this.code = code;
    this.students = [];
  }

  setCode(newCode) {
    this.code = newCode;
  }

  getCode(){
    return this.code;
  }

  addStudent(student) {
    this.students.push(student);
  }

  removeStudent(studentId) {
    this.students = this.students.filter(student => student.id !== studentId);
  }

  getStudents() {
    return this.students;
  }

  getStudentById(studentId) {//Para buscar un estudiante por Id
    return this.students.find(student => student.id === studentId);
  }

  getStudentsByRoomCode(code) {
    return this.students.filter(student => student.roomCode === code);
  }
}
module.exports = Room;
