linqtoO
=======

Linq to manipulate array in javascript

    <script src="https://github.com/romuloar/linqtoo/blob/master/linqtoo.min.js"></script>
    <script type="text/javascript">        
        var peoples = [
            { "firstName": "Romulo", "lastName": "Ribeiro", "Age": "31", "Gender": "M" },
            { "firstName": "John", "lastName": "Smith", "Age": "25", "Gender": "M" },
            { "firstName": "Paul", "lastName": "Jones", "Age": "40", "Gender": "M" },
            { "firstName": "Anna", "lastName": "Stone", "Age": "26", "Gender": "F" },
            { "firstName": "Glory", "lastName": "Ribeiro", "Age": "18", "Gender": "F" },
            { "firstName": "Regina", "lastName": "Dolores", "Age": "35", "Gender": "F" }
        ];

        var female = peoples.Where(function (item) { return item.Gender == 'F'; });
        console.log(female);

        var male = peoples.Where(function (item) { return item.Gender == 'M'; });
        console.log(male);

        var peoplesOld = peoples.Where(function (item) { return item.Age > 25; });
        console.log(peoplesOld);

        var peopleRibeiro = peoples.Where(function (item) { return item.Age > 25 && item.lastName == 'Ribeiro'; });
        console.log(peopleRibeiro);

        var countPeople = peoples.Count();
        console.log(countPeople);

        var countPeopleMale = peoples.Count(function (item) { return item.Gender == 'M'; });
        console.log(countPeopleMale);

        var any25 = peoples.Any(function (item) { return item.Age == 25; });
        console.log(any25);

        var listOrderAge = peoples.OrderBy(function (item) { return item.Age; });
        console.log(listOrderAge);

        var listOrderByDescendingFirstNameAndAge = peoples.OrderByDescending(function (item) { return item.Age; });
        console.log(listOrderByDescendingAge);
    </script>
