package d9.traning_project.exception;

import d9.traning_project.model.domain.GenericEntity;

public class ExistedException extends GenericException {

    public ExistedException(Class<? extends GenericEntity> clazz) {
        super(clazz);
    }
}
