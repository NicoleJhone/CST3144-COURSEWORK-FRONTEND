var webstore = new Vue({
    el: '#app',
    data: {
        sortBy: 'subject',
        ascending: true,
        sitename: 'After School Classes',
        subjects: subjects,
    },
    computed: {
        sortedSubjects() {
            let subjectsArray = this.subjects;

            // sort by subjects
            subjectsArray = subjectsArray.sort((a, b) => {
                if (this.sortBy == 'subject') {
                    let fa = a.title.toLowerCase(), fb = b.title.toLowerCase()
                    if (fa < fb) {
                        return -1
                    }
                    if (fa > fb) {
                        return 1
                    }
                    return 0
                } //sort by location
                else if (this.sortBy == 'location') {
                    let fa = a.location.toLowerCase(), fb = b.location.toLowerCase()
                    if (fa < fb) {
                        return -1
                    }
                    if (fa > fb) {
                        return 1
                    }
                    return 0
                } // sort by price
                else if (this.sortBy == 'price') {
                    if (a.price > b.price)
                        return 1;
                    if (a.price < b.price)
                        return -1;
                    return 0;
                }// sort by availability
                else if (this.sortBy == 'availability') {
                    if (a.availableSpace > b.availableSpace)
                        return 1;
                    if (a.availableSpace < b.availableSpace)
                        return -1;
                    return 0;
                }
            }) //sort to asc/desc
            if (!this.ascending) {
                subjectsArray.reverse()
            }
            return subjectsArray
        }
    }
});