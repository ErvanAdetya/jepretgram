<template>
<div class="modal fade" id="postPhoto" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Post a Photo</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body mt-1">
                <div class="row mt-1">
                    <div class="col-md-3">
                        Image
                    </div>
                    <div class="col-md-1">
                        :
                    </div>
                    <div class="col-md-8">
                        <input type="file" class="form-control-file" id="image-input" @change="takeFile">
                    </div>
                </div>
                <div class="row mt-1">
                    <div class="col-md-3">
                        Caption
                    </div>
                    <div class="col-md-1">
                        :
                    </div>
                    <div class="col-md-8">
                        <input type="text" class="form-control" id="caption" v-model="caption" placeholder="caption">
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-success" v-on:click="addPhoto()" data-dismiss="modal">
                    Add
                </button>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
  data: function () {
    return {
      caption: '',
      formData: new FormData(),
      file: null
    }
  },
  methods: {
    takeFile (event) {
      this.file = event.target.files[0]
    },
    addPhoto () {
      this.formData.append('avatar', this.file)
      this.formData.append('caption', this.caption)
      this.$store.dispatch('postPhoto', this.formData)
    }
  }
}
</script>

<style>

</style>
