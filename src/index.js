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
            loggedIn: false,
            drawerShown: false,
            username: "",
            password: ""
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
        }
    },
    computed: {
        routes() {
            return routes;
        }
    }
})