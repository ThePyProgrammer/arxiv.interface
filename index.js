// index.js
// Created by Prannaya Gupta
// 3 Dec 2022

const projects = [
    {
        num: 0,
        id: "ES009",
        title: "Optimization of the Telemetry, Tracking and Commmunications System in a CubeSat",
        authors: "Mayukh Das, Prannaya Gupta",
        abstract: "The growing commercialisation of the space industry and novel developments in miniaturisation technology has led to an increase of adoption of Cube-Satellites, a compact and multi-layered system...", 
        reveal: false,
        code: "ES009",
        year: "2023"
    },
    {
        num: 1,
        id: "PH022",
        title: "An Automated Screening System for Trinary Star System Candidates",
        authors: "Cheong Hao'En Ernest Emmanuel, Prannaya Gupta, Vikram Ramanathan, Yap Yuan Xi",
        abstract: "The discovery and cataloguing of trinary star systems is of significant interest to the field of astronomy, with implications from stellar system formation dynamics to satellite star capture frequency...",
        reveal: false,
        code: "PH022",
        year: "2022,2023"
    },
    {
        num: 2,
        id: "BE023",
        title: "Analysing Gait Patterns of PD Patients to Predict FoG using Machine Learning Algorithms",
        authors: "Nallapuraju Ananya, Prannaya Gupta, Ye Chen Rui",
        abstract: "Parkinson's Disease (PD) is a neurodegenerative disease that affects the substantia nigra, a region in the brain. It causes many hindrances to activities of daily living (ADL). A debilitating symptom...",
        reveal: false,
        code: "BE023",
        year: "2023"
    },
    {
        num: 3,
        id: "Cyberbullying",
        title: "Detecting Cyberbullying in Localised Text Messages using a Novel Classroom-Based Noisy Student Training Technique",
        authors: "Kabir Jain, Karimi Jain, Prannaya Gupta",
        abstract: "",
        reveal: false,
        code: "",
        year: "2023"
    },
    {
        num: 4,
        id: "SS028",
        title: "Detecting Malware Samples using a Novel Feature Vector and Deep Learning Methods",
        authors: "Ashwin Lokesh, Ishneet Sukhvinder Singh, Lam Yik Ting, Lim Sue Han Justin, Prannaya Gupta, Yau Le Qi",
        abstract: "Dynamic malware analysis, which has been a major field in malware analysis, involves executing the malware in a controlled environment and observing its behavior. Based on dynamic analysis reports...",
        reveal: false,
        code: "SS028",
        year: "2023"
    },
    {
        num: 5,
        id: "22.011.NUSH.PH",
        title: "Detecting and Simulating Stable Three-Body Systems",
        authors: "Cheong Hao'En Ernest Emmanuel, Prannaya Gupta, Vikram Ramanathan, Yap Yuan Xi",
        abstract: "",
        reveal: false,
        code: "22.011.NUSH.PH",
        year: "2022"
    },
    {
        num: 6,
        id: "21.029.SUTD.CS",
        title: "Embodied AI for computational perception and understanding of spatial designs",
        authors: "Karimi Zayan, Prannaya Gupta",
        abstract: "Semantic Segmentation is a Computer Vision task used to identify specific regions of interest for virtual agents and autonomous robots or vehicles, specifically by assigning a class to every pixel of...",
        reveal: false,
        code: "21.029.SUTD.CS, RO014",
        year: "2022"
    },
    {
        num: 7,
        id: "20.022.NUSE.PH",
        title: "Gait Monitoring and Analysis for Parkinson's Disease Patients",
        authors: "Nallapuraju Ananya, Prannaya Gupta, Ye Chen Rui",
        abstract: "",
        reveal: false,
        code: "20.022.NUSE.PH, BE018",
        year: "2021"
    }
]



const Main = Vue.extend({
    name: "Main",
    template: `
        <v-flex>
            <v-container fluid>
                <!-- <v-card>
                    <v-card-title class="pa-8" style="word-break: normal">
                        {{ content }}
                    </v-card-title>
                    <div class="text-right pa-8">
                        ~ {{ author }}
                    </div>
                    <v-spacer />
                </v-card>
                <v-spacer /> -->
                <h1>Your Projects</h1>
                    <v-layout wrap justify-space-around>
                        <v-flex v-for="project in projects" :key="project.num" style="flex-grow: 0; padding-bottom: 40px;">
                            <v-card class="mx-auto pa-4" max-width="400px" height="100%">
                                <v-flex class="text-overline">
                                    <div class="mx-4 d-flex">
                                        {{ project.code }} <v-spacer /> {{ project.year }}
                                    </div>
                                </v-flex>
                                <v-card-title class="text--primary" style="word-break: break-word;">
                                    {{ project.title }}
                                </v-card-title>
                                <v-card-subtitle>{{ project.authors }}</v-card-subtitle>
                                <v-card-actions>
                                    <v-btn
                                        text
                                        color="primary"
                                        dark :href="'#/projects/'+project.id" target="_blank"
                                    >
                                        Open
                                    </v-btn>
                                    <v-btn
                                        text v-if="!project.reveal"
                                        color="primary"
                                        @click="project.reveal = true"
                                    >
                                        Learn More
                                    </v-btn>
                                </v-card-actions>
                                <v-expand-transition>
                                <div v-if="project.reveal">
                                    <v-card-text class="pb-0">{{project.abstract}}</v-card-text>
                                    <v-card-actions class="pt-0">
                                        <v-btn
                                            text
                                            color="primary"
                                            @click="project.reveal = false"
                                        >
                                            Close
                                        </v-btn>
                                    </v-card-actions>
                                </div>
                                </v-expand-transition>
                            </v-card>
                        </v-flex>
                    </v-layout>
            </v-container>
        </v-flex>
    `,
    data() {
        return {
            projects: projects
        }
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

const Project = Vue.extend({
    name: "Project",
    template: `
        <v-container fluid>
            <v-flex>
                <v-card class="mx-auto pa-4" height="100%">
                    <v-flex class="text-overline">
                        <div class="mx-4 d-flex">
                            {{ project.code }} <v-spacer /> {{ project.year }}
                        </div>
                    </v-flex>
                    <v-card-title> {{ project.title }} </v-card-title>
                    <v-card-subtitle> {{ project.authors }} </v-card-subtitle>

                    <v-spacer />

                    <v-card-text>
                        <div v-if="!editAbstract">
                            {{ project.abstract }}
                            <v-btn
                                append-icon="mdi-magnify"
                                color="primary"
                                @click="editAbstract = true"
                            >
                                Edit
                            </v-btn>
                        </div>

                        <div v-if="editAbstract">
                            <v-textarea
                                clearable
                                auto-grow
                                v-model = "tempAbstract"
                                clear-icon="mdi-close-circle"
                                label="Text"
                                value="This is clearable text."
                            ></v-textarea>
                            <label id="counter">{{ wordCount(tempAbstract) }} words written</label>
                        </div>
                        
                    </v-card-text>
                </v-card>
            </v-flex>

        </v-container>
    `,
    data() {
        return {
            editAbstract: false,
            tempAbstract: ""
            // project: {}
        }
    },
    computed: {
        project() {
            return this.classify(this.$route.params.id);
        }
    },
    methods: {
        classify(id) {
            return projects.filter((it) => (it.id == id))[0];
        },
        wordCount(text) {
            var content = text;
            content = content.replace(/<\S[^><]*>/gi, "");
            return content.match(/\w+/g) ? content.match(/\w+/g).length : 0;
        }
    },
    mounted() {
        // this.project = this.classify(this.$route.params.id);
        this.tempAbstract = this.project.abstract;
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
    // { 
    //     path: '/users/:id'
    // },
    { 
        path: '/projects/:id',
        component: Project
    }
]

Vue.use(Vuetify);

const vuetify = new Vuetify({
  theme: {
    dark: true
  }
});
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