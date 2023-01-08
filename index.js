// index.js
// Created by Prannaya Gupta
// 3 Dec 2022

const Main = Vue.extend({
    name: "Main",
    template: `
        <v-flex>
            <v-container fluid>
                <v-card>
                    <v-card-title class="pa-8" style="word-break: normal">
                        {{ content }}
                    </v-card-title>
                    <div class="text-right pa-8">
                        ~ {{ author }}
                    </div>
                    <v-spacer />
                </v-card>
            </v-container>
        </v-flex>
    `,
    data() {
        return {
            content: "",
            author: ""
        }
    },
    async mounted() {
        const random_quotable_url = "https://api.quotable.io/random";
        const response = await (await fetch(random_quotable_url)).json();
        this.author = response.author;
        this.content = response.content;
        console.log(this.content, this.author);
    }

})

const GitHub = Vue.extend({
    name: "GitHub",
    template: `
        <v-container fluid>
            <v-card>
            <div class="pa-8">

                <v-row justify='center'>
                <v-col cols='auto' align-self="center">
                    <v-text-field v-model="name" label="Username" style="width: auto" v-on:keyup.enter="search" />
                </v-col>
                <v-col cols='auto' align-self="center">
                    <v-btn v-on:click=search style="display: block; margin: auto">SEARCH</v-btn>
                </v-col>
                </v-row>

                <v-data-table :items-per-page="15" :headers=headers :items=repos class="elevation-1"
                            :footer-props="{showFirstLastPage: true, firstIcon: 'mdi-arrow-collapse-left', lastIcon: 'mdi-arrow-collapse-right'}"
                            :loading=loadingRepos>
                </v-data-table>
            </div>
            </v-card>
        </v-container>
    `,
  data() {
    return {
      name: "",
      repos: [],
      loadingRepos: false,
      headers: [{text: "Repo Name", value: "name"},
        {text: "Language", value: "language"},
        {text: "Description", value: "description", sortable: false},
        {text: "Stars", value: "stargazers_count"},
        {text: "Watchers", value: "watchers_count"}]
    };
  },
  methods: {
    async search() {
            if(this.name != "") {
            this.repos = (await (await fetch(`https://api.github.com/users/${this.name}/repos?per_page=100`)).json());
            this.repos = this.repos.filter(
                repo => (!repo.fork && repo.language)
            );
        }
    }
  }
})

const SSEF = Vue.extend({
    name: "SSEF",
    template: `
        <v-container fluid>
            <v-card>
            <div class="pa-8">

                <v-row justify='center'>
                <v-col cols='auto' align-self="center">
                     <v-text-field
                        v-model="search"
                        append-icon="mdi-magnify"
                        label="Search"
                        single-line
                        hide-details
                    ></v-text-field>
                </v-col>
                </v-row>
                <v-data-table :items-per-page="15" :headers=headers :items=projects class="elevation-1"
                            :footer-props="{showFirstLastPage: true, firstIcon: 'mdi-arrow-collapse-left', lastIcon: 'mdi-arrow-collapse-right'}"
                            :loading=loadingProjects :search="search">
                </v-data-table>
            </div>
            </v-card>
        </v-container>
    `,
  data() {
    return {
      search: "",
      projects: [],
      loadingProjects: false,
      headers: [{text: "Project Code", value: "projectCode"},
        {text: "Title", value: "title"},
        {text: "School", value: "school"},
        {text: "Team Leader", value: "teamLeader"},
        {text: "Last Updated", value: "lastUpdated", filterable: false}]
    };
  },
    async mounted() {
        this.projects = await this.loadProjects();
        console.log(this.projects);
    },
  methods: {
    async loadProjects() {
        let finalData = []
        await axios.post(
            "https://www.ssef.com.sg/website/getProjectListForPublic",
            {  
                'project.ordering':'category',
                resultType:'json'
            }
        ).then(function (response) {
            let data = response.data;
            let start = data.indexOf("{");
            let end = data.lastIndexOf("}")+1;
            data = data.slice(start, end).replace("\t", "");
            start = data.indexOf("[");
            end = data.lastIndexOf("]")+1;
            data = JSON.parse(data.slice(start, end)).filter((it) => it.status == 20).map(
                (object) => {
                    return {
                        projectCode: object.category1 + object.projectCode.toString().padStart(3, "0"),
                        lastUpdated: moment(object.submissionDate, "DD/MM/YYYY hh:mm").toDate(),
                        teamLeader: object.memberName,
                        school: object.school.replace("&#39", "'"),
                        title: object.title.replace("&#39", "'")
                    }
                }
            );
            finalData = data;
        });
        return finalData;
    }
  }
})


const routes = [
    {
        name: "Main Page",
        path: "/",
        icon: "mdi-file-table-box",
        component: Main,
    },
    {
        name: "GitHub Tracker",
        path: "/github",
        icon: "mdi-github",
        component: GitHub,
    },
    {
        name: "SSEF Tracker",
        path: "/ssef",
        icon: "mdi-flask",
        component: SSEF,
    },
]

Vue.use(Vuetify);

const vuetify = new Vuetify();
const router = new VueRouter({
  routes,
});


var app = new Vue({
    el: '#app',
    vuetify: vuetify,
    router: router,
    data() {
        return {
            loggedIn: true,
            drawerShown: false,
            username: "",
            password: "",
            showPassword: false,
            font: window.innerWidth < 1000 ? 3 * 0.75 : 3,
            hideSubtitle: false,
            imgIsLoaded: false,
            img: "img/background.png",
            tab: null,
            loginItems: ["Login", "Register"]
        };
    },
    methods: {
        login() {
            console.log(`Username: ${this.username}`);
            console.log(`Password: ${this.password}`);
            if(this.username == "root" && this.password == "admin") {
                console.log("Logged In Successfully!");
                this.loggedIn = true;
            }
        },
        register() {
            console.log(`Username: ${this.username}`);
            console.log(`Password: ${this.password}`);
            console.log("Registered Successfully!");
            this.loggedIn = true;
        },
        logout() {
            this.username = "";
            this.password = "";
            this.loggedIn = false;
        },
        onScroll() {
            if (window.scrollY > this.height * 0.8) {
                this.font = 1;
                this.hideSubtitle = true;
            } else {
                this.font = 3;
                this.hideSubtitle = false;
            }
            if (this.width < 1000) {
                this.font *= 0.75;
            }
        },
        imgLoaded() {
            this.imgIsLoaded = true;
        }
    },
    computed: {
        routes() {
            return routes;
        },
        height() {
            return window.innerHeight;
        },
        width() {
        return window.innerWidth;
        },
    },
    mounted() {
        window.addEventListener("scroll", this.onScroll);
    }
})