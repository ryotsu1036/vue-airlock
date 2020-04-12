<template>
  <v-stepper v-model="e1">
    <v-stepper-header>
      <v-stepper-step :complete="e1 > 1" step="1"
        >Name of step 1</v-stepper-step
      >

      <v-divider></v-divider>

      <v-stepper-step :complete="e1 > 2" step="2"
        >Name of step 2</v-stepper-step
      >

      <v-divider></v-divider>

      <v-stepper-step step="3">Name of step 3</v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
        <v-file-input
          @change="onUpload"
          v-model="files"
          v-show="false"
          multiple
          name="files"
          label="File input"
        ></v-file-input>

        <v-card class="mb-12 pa-4" min-height="400" v-show="items.length">
          <draggable v-model="items" class="d-flex flex-row flex-wrap">
            <div class="pdf mx-6 mb-6" v-for="item in items" :key="item.uuid">
              <div class="pdf-action">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn icon small v-on="on" @click="onRemove(item.uuid)">
                      <v-icon>mdi-close</v-icon>
                    </v-btn>
                  </template>
                  <span>移除這筆</span>
                </v-tooltip>
              </div>

              <canvas :id="item.uuid"></canvas>

              <div class="pdf-text text-truncate">
                {{ item.name }}
              </div>
            </div>
          </draggable>
        </v-card>

        <v-card class="mb-12" v-show="items.length === 0">
          <div id="box" @click="triggerFileInput">
            <div id="box-inner">
              <div>
                <svg
                  enable-background="new 0 0 512 512"
                  fill="white"
                  height="80"
                  width="80"
                  viewBox="0 0 512 512"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g>
                    <path
                      d="m492.804 198.276c0-32.598-12.693-63.244-35.741-86.292l-76.242-76.242c-23.049-23.049-53.694-35.742-86.291-35.742h-.001-137.534c-4.143 0-7.5 3.358-7.5 7.5s3.357 7.5 7.5 7.5h120.666c31.326 0 56.812 25.486 56.812 56.812v39.143c0 26.124 21.253 47.377 47.377 47.377h39.143c31.262 0 56.703 25.382 56.808 56.62v249.668c0 17.854-14.521 32.38-32.37 32.38h-327.6c-14.774 0-27.525-9.841-31.287-24.034l-.321-46.263h243.247c33.018 0 59.88-26.862 59.88-59.88v-16.214c0-4.142-3.357-7.5-7.5-7.5s-7.5 3.358-7.5 7.5v16.214c0 24.747-20.133 44.88-44.88 44.88h-268.855c-14.567 0-26.419-11.852-26.419-26.419v-162.331c7.175 5.958 16.385 9.546 26.419 9.546h268.854c24.747 0 44.88 20.133 44.88 44.88v43.229c0 4.142 3.357 7.5 7.5 7.5s7.5-3.358 7.5-7.5v-43.229c0-33.018-26.862-59.88-59.88-59.88h-244.01v-170.119c0-17.854 14.521-32.38 32.37-32.38h9.171c4.143 0 7.5-3.358 7.5-7.5s-3.358-7.5-7.5-7.5h-9.17c-26.12 0-47.37 21.255-47.37 47.38v102.281h-9.845c-22.839 0-41.419 18.581-41.419 41.419v194.204c0 22.839 18.58 41.419 41.419 41.419h10.606l.328 47.269c.004.57.073 1.137.205 1.691 5.112 21.395 24.059 36.337 46.076 36.337h327.6c26.12 0 47.37-21.255 47.37-47.38zm-432.189-33.615h9.845v52.838h-9.845c-14.567 0-26.419-11.852-26.419-26.419s11.851-26.419 26.419-26.419zm360.377-21.329h-39.143c-17.853 0-32.377-14.524-32.377-32.377v-39.143c0-20.268-8.438-38.599-21.987-51.669 15.941 5.136 30.545 14.021 42.729 26.205l76.242 76.242c12.185 12.184 21.069 26.788 26.205 42.729-13.07-13.549-31.402-21.987-51.669-21.987z"
                    />
                    <path
                      d="m321.254 281.773c4.143 0 7.5-3.358 7.5-7.5s-3.357-7.5-7.5-7.5h-38.667c-4.143 0-7.5 3.358-7.5 7.5v95.405c0 4.142 3.357 7.5 7.5 7.5s7.5-3.358 7.5-7.5v-41.106h28.096c4.143 0 7.5-3.358 7.5-7.5s-3.357-7.5-7.5-7.5h-28.096v-31.799z"
                    />
                    <path
                      d="m184.246 266.773c-1.991 0-3.901.792-5.309 2.202-1.406 1.41-2.195 3.321-2.191 5.313v.082.003 93.756c0 .584.073 1.15.2 1.695.038 1.946.827 3.804 2.209 5.177 1.405 1.395 3.305 2.177 5.284 2.177h.028c.815-.003 20.053-.077 27.721-.211 13.31-.232 25.16-6.262 33.371-16.977 7.566-9.876 11.734-23.376 11.734-38.014 0-33.018-18.497-55.202-46.027-55.202h-27.02zm58.047 55.203c0 23.235-12.487 39.681-30.367 39.993-4.561.08-13.549.139-20.013.174-.037-10.943-.099-30.975-.099-40.272 0-7.781-.035-28.76-.056-40.097h19.507c15.001-.001 31.028 10.561 31.028 40.202z"
                    />
                    <path
                      d="m102.582 266.07c-1.993 0-3.904.793-5.312 2.205-1.398 1.402-2.182 3.3-2.187 5.279 0 .006-.002.011-.002.016v96.108c0 4.142 3.357 7.5 7.5 7.5s7.5-3.358 7.5-7.5v-34.288c6.224-.034 14.857-.077 19.261-.077 19.383 0 35.152-15.531 35.152-34.622s-15.77-34.622-35.152-34.622h-26.76zm46.913 34.622c0 10.636-9.229 19.622-20.152 19.622-4.38 0-12.893.042-19.117.076-.034-6.391-.077-15.229-.077-19.698 0-3.77-.024-12.975-.044-19.622h19.238c10.923 0 20.152 8.985 20.152 19.622z"
                    />
                  </g>
                </svg>
              </div>
              <div id="box-description">
                <strong>....</strong>
                <p>在此處放置檔案或點擊上傳</p>
              </div>
            </div>
          </div>
        </v-card>

        <div class="d-flex justify-space-between">
          <v-btn
            color="pink lighten-2"
            class="ma-2 white--text"
            :style="items.length ? 'visibility: visible' : 'visibility: hidden'"
            @click="triggerFileInput"
          >
            上傳更多
            <v-icon right dark>mdi-pdf-box</v-icon>
          </v-btn>
          <v-btn color="primary" @click="onMerge">
            On Merge
          </v-btn>
        </div>
      </v-stepper-content>

      <v-stepper-content step="2">
        <v-card class="mb-12" color="grey lighten-1" height="200px"></v-card>

        <v-btn color="primary" @click="e1 = 3">
          Continue
        </v-btn>

        <v-btn text>Cancel</v-btn>
      </v-stepper-content>

      <v-stepper-content step="3">
        <v-card class="mb-12" color="grey lighten-1" height="200px"></v-card>

        <v-btn color="primary" @click="e1 = 1">
          Continue
        </v-btn>

        <v-btn text>Cancel</v-btn>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
import axios from "axios";
import pdfjsLib from "pdfjs-dist/build/pdf";
import draggable from "vuedraggable";

export default {
  components: {
    draggable
  },
  data: () => ({
    e1: 1,
    dir: "",
    files: [],
    items: []
  }),
  methods: {
    triggerFileInput() {
      document.querySelector("input[type=file]").click();
    },

    onUpload() {
      let formData = new FormData();
      formData.append("dir", this.dir);
      for (let i = 0; i < this.files.length; i++) {
        formData.append("files[]", this.files[i]);
      }

      this.files = [];

      axios
        .post("/api/files", formData, {
          headers: { "Content-Type": "multipart/form-data" }
        })
        .then(response => {
          console.log(response.data);
          this.dir = response.data.dir;
          this.items.push(...response.data.items);
          this.onPreview();
        });
    },

    onPreview() {
      // https://meeting.ntpu.edu.tw/storage/documents/m5eaTsBqlUEnz/fcAdIsCoyxrRdhUp5n1QXfCIZRGkfbYXFsw8kaZK.pdf
      // http://airlock.test:8000/storage/merges/1ywnTatkVoN4TcfM0DO0MqYBO8Fn1n8IpEmxbFVM.pdf
      // https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/examples/learning/helloworld.pdf
      // https://cms.carrier.ntpu.edu.tw/uploads/b680fec6a831494c9369681e5179d908.pdf

      this.items.forEach(item => {
        let url = `http://airlock.test:8000/api/${item.path}`;
        console.log(url);
        let loadingTask = pdfjsLib.getDocument({
          url: url,
          withCredentials: true
        });

        loadingTask.promise.then(
          function(pdf) {
            // console.log("PDF loaded");

            // Fetch the first page
            let pageNumber = 1;
            pdf.getPage(pageNumber).then(function(page) {
              // console.log("Page loaded");

              let scale = 1.5;
              let viewport = page.getViewport({ scale: scale });

              // Prepare canvas using PDF page dimensions
              let canvas = document.getElementById(item.uuid);
              let context = canvas.getContext("2d");
              canvas.height = viewport.height;
              canvas.width = viewport.width;

              // Render PDF page into canvas context
              let renderContext = {
                canvasContext: context,
                viewport: viewport
              };
              let renderTask = page.render(renderContext);
              renderTask.promise.then(function() {
                console.log("Page rendered");
              });
            });
          },
          function(reason) {
            // PDF loading error
            console.error(reason);
          }
        );
      });
    },

    onRemove(uuid) {
      this.items = this.items.filter(item => {
        return item.uuid !== uuid;
      });
    },

    onMerge() {
      // this.e1 = 2;

      console.log(this.items);
    }
  }
};
</script>

<style lang="scss" scoped>
#box {
  background-color: #4787f3;
  cursor: pointer;
  width: 100%;
  height: 400px;
  padding: 40px;

  #box-inner {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    background-color: #386ad4;
    border: 2px rgba(0, 0, 0, 0.4) dashed;
    border-radius: inherit;
  }

  #box-description {
    color: #fff;
    font-size: 16px;
    text-align: center;
  }
}

.pdf {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #cfd8dc;
  width: 200px;
  height: 226px;

  .pdf-action {
    width: 100%;
    text-align: right;

    .v-icon {
      cursor: pointer;
    }
  }

  canvas {
    background-color: #000;
    width: 120px;
    height: 168px;
  }

  .pdf-text {
    text-align: center;
    font-size: 12px;
    max-width: 150px;
    height: 28px;
    line-height: 28px;
  }
}
</style>
