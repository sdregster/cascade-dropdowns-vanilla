const mockData = {
  Москва: {
    Литейный: ['Иванов', 'Петров'],
    Ремонтный: ['Сидоров', 'Романов'],
  },
  Новокузнецк: {
    Сборочный: ['Клименчук', 'Зелин'],
    Кузовной: ['Бобин', 'Булатов'],
  },
};

window.addEventListener('load', () => {
  let citySelect = document.querySelector('.city');
  let departmentSelect = document.querySelector('.department');
  let workerSelect = document.querySelector('.worker');

  for (let item in mockData) {
    citySelect.add(new Option(item, item));
  }

  citySelect.addEventListener('change', function () {
    if (this.value) {
      departmentSelect.length = 1;
      for (let item in mockData[this.value]) {
        departmentSelect.add(new Option(item, item));
      }
      departmentSelect.disabled = false;
      workerSelect.disabled = true;
    } else {
      departmentSelect.value = '';
      departmentSelect.disabled = true;
      workerSelect.value = '';
      workerSelect.disabled = true;
    }
    saveData();
  });

  departmentSelect.addEventListener('change', function () {
    if (this.value) {
      workerSelect.length = 1;
      let key = mockData[citySelect.value][this.value];
      for (let i = 0; i < key.length; i++) {
        workerSelect.add(new Option(key[i], key[i]));
      }
      workerSelect.disabled = false;
    } else {
      workerSelect.value = '';
      workerSelect.disabled = true;
    }
    saveData();
  });

  workerSelect.addEventListener('change', function () {
    saveData();
  });

  const rawData = JSON.parse(localStorage.getItem('data'));
  if (rawData) {
    citySelect.value = rawData.city;
    citySelect.dispatchEvent(new Event('change'));
    departmentSelect.value = rawData.department;
    departmentSelect.dispatchEvent(new Event('change'));
    workerSelect.value = rawData.worker;
    workerSelect.dispatchEvent(new Event('change'));
  }

  function saveData() {
    const selectedData = {
      city: citySelect.value,
      department: departmentSelect.value,
      worker: workerSelect.value,
    };
    localStorage.setItem('data', JSON.stringify(selectedData));
  }
});
