const personGenerator = {
    surnameJson: `{
        "count": 16,
        "list": {
            "id_1": "Иванов",
            "id_2": "Смирнов",
            "id_3": "Кузнецов",
            "id_4": "Васильев",
            "id_5": "Петров",
            "id_6": "Михайлов",
            "id_7": "Новиков",
            "id_8": "Федоров",
            "id_9": "Кравцов",
            "id_10": "Николаев",
            "id_11": "Семёнов",
            "id_12": "Славин",
            "id_13": "Степанов",
            "id_14": "Павлов",
            "id_15": "Александров",
            "id_16": "Морозов"
        }
    }`,
    firstNameMaleJson: `{
        "count": 10,
        "list": {
            "id_1": "Александр",
            "id_2": "Максим",
            "id_3": "Иван",
            "id_4": "Артем",
            "id_5": "Дмитрий",
            "id_6": "Никита",
            "id_7": "Михаил",
            "id_8": "Даниил",
            "id_9": "Егор",
            "id_10": "Андрей"
        }
    }`,
    firstNameFemaleJson: `{
        "count": 10,
        "list": {
            "id_1": "Александра",
            "id_2": "Мария",
            "id_3": "Анна",
            "id_4": "Виктория",
            "id_5": "Екатерина",
            "id_6": "Наталья",
            "id_7": "Елена",
            "id_8": "Дарья",
            "id_9": "Ольга",
            "id_10": "Татьяна"
        }
    }`,
    jobMaleJson: `{
        "count": 10,
        "list": {
            "id_1": "строитель",
            "id_2": "программист",
            "id_3": "водитель",
            "id_4": "инженер",
            "id_5": "электрик",
            "id_6": "сварщик",
            "id_7": "военный",
            "id_8": "механик",
            "id_9": "охранник",
            "id_10": "грузчик"
        }
    }`,
    jobFemaleJson: `{
        "count": 10,
        "list": {
            "id_1": "учительница",
            "id_2": "медсестра",
            "id_3": "бухгалтер",
            "id_4": "продавец",
            "id_5": "воспитательница",
            "id_6": "парикмахер",
            "id_7": "швея",
            "id_8": "дизайнер",
            "id_9": "кассир",
            "id_10": "секретарь"
        }
    }`,
    months: [
        {name: 'января', days: 31},
        {name: 'февраля', days: 28},
        {name: 'марта', days: 31},
        {name: 'апреля', days: 30},
        {name: 'мая', days: 31},
        {name: 'июня', days: 30},
        {name: 'июля', days: 31},
        {name: 'августа', days: 31},
        {name: 'сентября', days: 30},
        {name: 'октября', days: 31},
        {name: 'ноября', days: 30},
        {name: 'декабря', days: 31}
    ],

    GENDER_MALE: 'Мужчина',
    GENDER_FEMALE: 'Женщина',

    randomIntNumber: (max = 1, min = 0) => Math.floor(Math.random() * (max - min + 1) + min),

    randomValue: function (json) {
        const obj = JSON.parse(json);
        const prop = `id_${this.randomIntNumber(obj.count, 1)}`;
        return obj.list[prop];
    },

    randomSurname: function() {
        const surname = this.randomValue(this.surnameJson);
        return this.person.gender === this.GENDER_FEMALE ? surname + 'а' : surname;
    },

    randomFirstName: function() {
        return this.person.gender === this.GENDER_MALE 
            ? this.randomValue(this.firstNameMaleJson) 
            : this.randomValue(this.firstNameFemaleJson);
    },

    randomPatronymic: function(gender) {
    const name = this.randomValue(this.firstNameMaleJson);
    let base = '';
    let malePatronymic = '';
    let femalePatronymic = '';

    if (name.endsWith('ий')) {
        base = name.slice(0, -2);
        malePatronymic = base + 'евич';
        femalePatronymic = base + 'евна';
    } else if (name.endsWith('ей')) {
        base = name.slice(0, -2);
        malePatronymic = base + 'евич';
        femalePatronymic = base + 'евна';
    } else if (name.endsWith('а')) {
        base = name.slice(0, -1);
        malePatronymic = base + 'ич';
        femalePatronymic = base + 'ична';
    } else if (name.endsWith('я')) {
        base = name.slice(0, -1);
        malePatronymic = base + 'ич';
        femalePatronymic = base + 'ична';
    } else {
        malePatronymic = name + 'ович';
        femalePatronymic = name + 'овна';
    }

    return gender === this.GENDER_FEMALE ? femalePatronymic : malePatronymic;
    },

    randomGender: function() {
        return this.randomIntNumber(1) === 0 ? this.GENDER_MALE : this.GENDER_FEMALE;
    },

    randomBirthDate: function() {
        const currentYear = new Date().getFullYear();
        const year = this.randomIntNumber(currentYear - 18, currentYear - 100);
        const monthIndex = this.randomIntNumber(11, 0);
        const month = this.months[monthIndex];
        const day = this.randomIntNumber(month.days, 1);
        
        return {
            day: day,
            month: month.name,
            year: year,
            fullDate: `${day} ${month.name} ${year} года`
        };
    },

    randomJob: function() {
        return this.person.gender === this.GENDER_MALE 
            ? this.randomValue(this.jobMaleJson) 
            : this.randomValue(this.jobFemaleJson);
    },

    getPerson: function() {
        this.person = {};
        this.person.gender = this.randomGender();
        this.person.firstName = this.randomFirstName();
        this.person.surname = this.randomSurname();
        this.person.patronymic = this.randomPatronymic(this.person.gender);
        this.person.job = this.randomJob();
        const birthDate = this.randomBirthDate();
        this.person.birthDay = birthDate.day;
        this.person.birthMonth = birthDate.month;
        this.person.birthYear = birthDate.year;
        this.person.birthDate = birthDate.fullDate;
        return this.person;
    }
};