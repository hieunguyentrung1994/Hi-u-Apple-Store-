package d9.traning_project.exception;

import d9.traning_project.model.domain.GenericEntity;

public class GenericException extends Exception {
    private Class<? extends GenericEntity> clazz;

    public GenericException(Class<? extends GenericEntity> clazz) {
        this.clazz = clazz;
    }

    @Override
    public String getMessage() {
        return super.getMessage();
    }
}
