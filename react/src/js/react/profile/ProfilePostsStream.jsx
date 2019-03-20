import React from "react";
import Reflux from "reflux";

import { Alert } from "react-bootstrap";

import ProfileActions from "./ProfileActions";
import ProfileStore from "./ProfileStore";
import LoadingComponent from "../misc/LoadingComponent";

import PostFeed from "../posts/PostFeed";

/**
 * Renders the posts made by the current viewed user that is visible to the authenticated user
 */
export default class ProfilePostsStream extends Reflux.Component {
    constructor(props) {
        super(props);
        this.store = ProfileStore;
    }

    componentDidMount() {
        ProfileActions.loadActivityStream(this.props.id);
    }

    _loadMorePosts = () => {
        ProfileActions.loadActivityStream(this.props.id, this.state.nextPage);
    };

    render() {
        if (this.state.errorLoadingStream) {
            return (
                <Alert bsStyle="danger">
                    An error occurred while loading the user's activity stream.
                </Alert>
            );
        } else if (this.state.isLoadingStream) {
            return <LoadingComponent />;
        }
        return (
            <div className="posts-background">
                <PostFeed posts={this.state.posts}
                    isLoading={this.state.isLoadingStream}
                    loadMorePosts={this.state._loadMorePosts}
                    onDeletePost={ProfileActions.deletePost}
                    hasNextPage={Boolean(this.state.nextPage)}
                    errorDeletingPost={this.state.failedToDeletePost}
                    deletingPost={this.state.deletingPost}
                />
            </div>
        );
    }
}