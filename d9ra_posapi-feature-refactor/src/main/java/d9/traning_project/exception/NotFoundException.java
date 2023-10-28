package d9.traning_project.exception;

import d9.traning_project.model.domain.GenericEntity;

public class NotFoundException extends GenericException {

    public NotFoundException(Class<? extends GenericEntity> clazz) {
        super(clazz);
    }
}
