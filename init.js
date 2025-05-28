window.onload = function() {
    const initPerson = personGenerator.getPerson();
    document.getElementById('firstNameOutput').innerText = initPerson.firstName;
    document.getElementById('surnameOutput').innerText = initPerson.surname;
    document.getElementById('patronymicOutput').innerText = initPerson.patronymic;
    document.getElementById('genderOutput').innerText = initPerson.gender;
    document.getElementById('jobOutput').innerText = initPerson.job;
    document.getElementById('birthDateOutput').innerText = initPerson.birthDate;

    document.getElementById('btnGenerate').addEventListener('click', function() {
        const newPerson = personGenerator.getPerson();
        document.getElementById('firstNameOutput').innerText = newPerson.firstName;
        document.getElementById('surnameOutput').innerText = newPerson.surname;
        document.getElementById('patronymicOutput').innerText = newPerson.patronymic;
        document.getElementById('genderOutput').innerText = newPerson.gender;
        document.getElementById('jobOutput').innerText = newPerson.job;
        document.getElementById('birthDateOutput').innerText = newPerson.birthDate;
    });

    document.getElementById('btnClear').addEventListener('click', function() {
        personGenerator.clearPerson();
    });
};

personGenerator.clearPerson = function() {
    document.getElementById('firstNameOutput').innerText = '';
    document.getElementById('surnameOutput').innerText = '';
    document.getElementById('patronymicOutput').innerText = '';
    document.getElementById('genderOutput').innerText = '';
    document.getElementById('jobOutput').innerText = '';
    document.getElementById('birthDateOutput').innerText = '';
};
