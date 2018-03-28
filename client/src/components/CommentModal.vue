<template>
<div class="modal fade" id="commentModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Comment</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body mt-1">
                <div class="row mt-1">
                    <div class="col-md-3">
                        Comment
                    </div>
                    <div class="col-md-1">
                        :
                    </div>
                    <div class="col-md-8">
                        <input type="text" class="form-control" id="comment" v-model="comment" placeholder="caption">
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-success" v-on:click="commentPhoto()" data-dismiss="modal">
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
      comment: ''
    }
  },
  methods: {
    commentPhoto () {
      this.$store.dispatch('commentPhoto', {
        comment: this.comment
      })
    }
  }
}
</script>

<style>

</style>
